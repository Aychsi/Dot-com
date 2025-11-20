// Tab functionality for CV sections - Top Navigation Style
(function() {
  'use strict';

  // Map of section IDs to tab labels
  const sectionTabs = {
    'education': 'Education',
    'work-experience': 'Experience',
    'selected-projects-and-research': 'Research',
    'personal-projects': 'Projects',
    'finance-projects': 'Finance',
    'publications': 'Publications',
    'presentations': 'Presentations',
    'sample-research-poster': 'Posters',
    'sample-industry-poster': 'Posters'
  };

  function initTabs() {
    // Find all sections that should be in tabs
    const sections = {};
    const tabLabels = new Set();
    
    // Collect all sections
    Object.keys(sectionTabs).forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const tabLabel = sectionTabs[sectionId];
        tabLabels.add(tabLabel);
        
        // Find the container (parent .container div)
        const container = section.closest('.container');
        if (container) {
          if (!sections[tabLabel]) {
            sections[tabLabel] = [];
          }
          sections[tabLabel].push(container);
        }
      }
    });

    if (Object.keys(sections).length === 0) {
      return; // No sections found
    }

    // Group poster sections together
    if (sections['Posters'] && sections['Posters'].length > 1) {
      const postersContainers = sections['Posters'];
      const firstPoster = postersContainers[0];
      const parentContainer = firstPoster.parentElement;
      
      // Create wrapper for posters
      const postersWrapper = document.createElement('div');
      postersWrapper.className = 'container section-in-tabs';
      postersWrapper.setAttribute('data-tab-section', 'Posters');
      postersWrapper.style.display = 'none';
      
      // Insert wrapper before first poster
      parentContainer.insertBefore(postersWrapper, firstPoster);
      
      // Move all poster containers into wrapper
      postersContainers.forEach(container => {
        postersWrapper.appendChild(container);
      });
      
      // Update sections object
      sections['Posters'] = [postersWrapper];
    }

    // Mark all sections as tab sections
    Object.keys(sections).forEach(tabLabel => {
      sections[tabLabel].forEach(container => {
        container.classList.add('section-in-tabs');
        container.setAttribute('data-tab-section', tabLabel);
        container.style.display = 'none';
      });
    });

    // Find where to insert the navigation (after About Me section)
    const aboutMe = document.getElementById('about-me');
    const mainContent = aboutMe ? aboutMe.closest('main') : document.querySelector('main');
    
    if (!mainContent) {
      return;
    }

    // Create navigation bar
    const navContainer = document.createElement('div');
    navContainer.className = 'main-nav-tabs';
    
    const navList = document.createElement('div');
    navList.className = 'tabs-nav';
    
    // Create tab buttons
    const tabLabelsArray = Array.from(tabLabels).sort();
    tabLabelsArray.forEach((tabLabel, index) => {
      const button = document.createElement('button');
      button.className = 'tab-button' + (index === 0 ? ' active' : '');
      button.textContent = tabLabel;
      button.setAttribute('data-tab', tabLabel);
      button.setAttribute('type', 'button');
      button.addEventListener('click', () => switchTab(tabLabel));
      navList.appendChild(button);
    });
    
    navContainer.appendChild(navList);
    
    // Insert navigation after About Me section
    const aboutMeContainer = aboutMe ? aboutMe.closest('.container') : null;
    if (aboutMeContainer && aboutMeContainer.nextSibling) {
      aboutMeContainer.parentElement.insertBefore(navContainer, aboutMeContainer.nextSibling);
    } else if (mainContent.firstChild) {
      mainContent.insertBefore(navContainer, mainContent.firstChild);
    } else {
      mainContent.appendChild(navContainer);
    }

    // Show first tab by default
    if (tabLabelsArray.length > 0) {
      switchTab(tabLabelsArray[0], false);
    }
  }

  function switchTab(tabLabel, animate = true) {
    // Update button states
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-tab') === tabLabel) {
        btn.classList.add('active');
      }
    });

    // Hide all sections
    document.querySelectorAll('.section-in-tabs').forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none';
    });
    
    // Show the active section
    const activeSections = document.querySelectorAll(`.section-in-tabs[data-tab-section="${tabLabel}"]`);
    activeSections.forEach(section => {
      section.classList.add('active');
      section.style.display = 'block';
    });
    
    // Scroll to top of navigation
    if (animate) {
      const navContainer = document.querySelector('.main-nav-tabs');
      if (navContainer) {
        navContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // Initialize when DOM is ready - try multiple times to ensure it runs
  function tryInit() {
    if (document.getElementById('about-me') && document.querySelector('main')) {
      initTabs();
    } else {
      // Retry after a short delay
      setTimeout(tryInit, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    // DOM already loaded, try immediately
    tryInit();
  }
})();
