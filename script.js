const sections = document.querySelectorAll("section[id], footer[id]");
const navLinks = document.querySelectorAll(".header__nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        // Remove active cũ
        navLinks.forEach((link) => link.classList.remove("active"));

        // Add active mới
        const activeLink = document.querySelector(`.header__nav-link[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "-80px 0px 0px 0px", // trừ header + bắt sớm
  }
);

sections.forEach((section) => observer.observe(section));
