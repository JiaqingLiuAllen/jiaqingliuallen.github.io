// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "news-our-paper-is-accepted-to-soft-science",
          title: 'Our paper is accepted to Soft Science.',
          description: "",
          section: "News",},{id: "news-moved-to-seattle",
          title: 'Moved to Seattle.',
          description: "",
          section: "News",},{id: "news-ecg-necklace-is-accepted-to-chi-25",
          title: 'ECG Necklace is accepted to CHI ’25.',
          description: "",
          section: "News",},{id: "news-moved-to-notre-dame",
          title: 'Moved to Notre Dame.',
          description: "",
          section: "News",},{id: "news-circuit2yarn-is-accepted-to-chi-26",
          title: 'Circuit2Yarn is accepted to CHI ’26.',
          description: "",
          section: "News",},{id: "news-attended-chi-26-in-barcelona",
          title: 'Attended CHI ’26 in Barcelona.',
          description: "",
          section: "News",},{id: "news-attended-uist-26-in-detroit-and-served-as-a-student-volunteer",
          title: 'Attended UIST ’26 in Detroit and served as a student volunteer.',
          description: "",
          section: "News",},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6A%6C%69%75%34%33@%6E%64.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/JiaqingLiuAllen", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/jiaqing-allen-liu", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=m2H49yUAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
