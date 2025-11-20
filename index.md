---
#
# By default, content added below the "---" mark will appear in the home page
# between the top bar and the list of recent posts.
# To change the home page layout, edit the _layouts/home.html file.
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
#
layout: default
---

<div style="display:none;">
<script src="/hansoochang/assets/tabs.js" defer></script>
</div>

// Tab functionality for CV sections
(function() {
  'use strict';
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
    const sections = {};
    const tabLabels = new Set();
    Object.keys(sectionTabs).forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const tabLabel = sectionTabs[sectionId];
        tabLabels.add(tabLabel);
        const container = section.closest('.container');
        if (container) {
          if (!sections[tabLabel]) sections[tabLabel] = [];
          sections[tabLabel].push(container);
        }
      }
    });
    if (Object.keys(sections).length === 0) return;
    if (sections['Posters'] && sections['Posters'].length > 1) {
      const postersContainers = sections['Posters'];
      const firstPoster = postersContainers[0];
      const parentContainer = firstPoster.parentElement;
      const postersWrapper = document.createElement('div');
      postersWrapper.className = 'container section-in-tabs';
      postersWrapper.setAttribute('data-tab-section', 'Posters');
      postersWrapper.style.display = 'none';
      parentContainer.insertBefore(postersWrapper, firstPoster);
      postersContainers.forEach(container => postersWrapper.appendChild(container));
      sections['Posters'] = [postersWrapper];
    }
    Object.keys(sections).forEach(tabLabel => {
      sections[tabLabel].forEach(container => {
        container.classList.add('section-in-tabs');
        container.setAttribute('data-tab-section', tabLabel);
        container.style.display = 'none';
      });
    });
    const aboutMe = document.getElementById('about-me');
    const mainContent = aboutMe ? aboutMe.closest('main') : document.querySelector('main');
    if (!mainContent) return;
    const navContainer = document.createElement('div');
    navContainer.className = 'main-nav-tabs';
    const navList = document.createElement('div');
    navList.className = 'tabs-nav';
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
    const aboutMeContainer = aboutMe ? aboutMe.closest('.container') : null;
    if (aboutMeContainer && aboutMeContainer.nextSibling) {
      aboutMeContainer.parentElement.insertBefore(navContainer, aboutMeContainer.nextSibling);
    } else if (mainContent.firstChild) {
      mainContent.insertBefore(navContainer, mainContent.firstChild);
    } else {
      mainContent.appendChild(navContainer);
    }
    if (tabLabelsArray.length > 0) switchTab(tabLabelsArray[0], false);
  }
  function switchTab(tabLabel, animate = true) {
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-tab') === tabLabel) btn.classList.add('active');
    });
    document.querySelectorAll('.section-in-tabs').forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none';
    });
    const activeSections = document.querySelectorAll(`.section-in-tabs[data-tab-section="${tabLabel}"]`);
    activeSections.forEach(section => {
      section.classList.add('active');
      section.style.display = 'block';
    });
    if (animate) {
      const navContainer = document.querySelector('.main-nav-tabs');
      if (navContainer) navContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  function tryInit() {
    if (document.getElementById('about-me') && document.querySelector('main')) {
      initTabs();
    } else {
      setTimeout(tryInit, 100);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    tryInit();
  }
})();
</script>

