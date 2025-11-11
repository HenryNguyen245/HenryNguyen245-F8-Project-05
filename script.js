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

// show feedback
const feedbackList = document.querySelector(".feedback__list");
let feedbackItems = document.querySelectorAll(".feedback__item");
const totalItems = feedbackItems.length;
const gap = 30;

// Clone item đầu tiên để smooth loop
const firstClone = feedbackItems[0].cloneNode(true);
feedbackList.appendChild(firstClone);

// Cập nhật lại node list sau khi clone
feedbackItems = document.querySelectorAll(".feedback__item");

const footerItems = document.querySelectorAll(".feedback__footer__item");

let currentIndex = 0; // active bên trái
let autoSlide;

// Cập nhật transform + active
function updateSlider(transition = true) {
  feedbackList.style.transition = transition ? "transform 0.6s ease" : "none";

  // Remove active cũ
  feedbackItems.forEach((item) => item.classList.remove("active"));
  document
    .querySelectorAll(".feedback__item-desc")
    .forEach((desc) => desc.classList.remove("active"));

  // Active bên trái
  const activeItem = feedbackItems[currentIndex];
  activeItem.classList.add("active");
  const activeDesc = activeItem.querySelector(".feedback__item-desc");
  if (activeDesc) activeDesc.classList.add("active");

  // Cập nhật footer
  footerItems.forEach((dot, idx) => dot.classList.remove("active"));
  // Nếu currentIndex = totalItems (clone), active dot là index 0
  const activeDotIndex = currentIndex >= totalItems ? 0 : currentIndex;
  footerItems[activeDotIndex].classList.add("active");

  const itemWidth = feedbackItems[0].offsetWidth + gap;
  feedbackList.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
}

// Chuyển slide tiếp theo 1 item
function nextSlide() {
  currentIndex++;
  updateSlider();

  const itemWidth = feedbackItems[0].offsetWidth + gap;

  // Nếu tới clone, reset ngay về item thật đầu tiên
  if (currentIndex === totalItems) {
    setTimeout(() => {
      updateSlider(false); // tắt transition
      currentIndex = 0;
      updateSlider(false);
    }, 600); // bằng thời gian transition
  }
}

// Auto slide
function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

// Init
updateSlider();
startAutoSlide();

// Hover dừng
feedbackList.addEventListener("mouseenter", stopAutoSlide);
feedbackList.addEventListener("mouseleave", startAutoSlide);

// Pause khi hover vào .feedback__item-desc hoặc .feedback__people-avatar
feedbackItems.forEach((item) => {
  const desc = item.querySelector(".feedback__item-desc");
  const avatar = item.querySelector(".feedback__people-avatar");

  if (desc) {
    desc.addEventListener("mouseenter", stopAutoSlide);
    desc.addEventListener("mouseleave", startAutoSlide);
  }

  if (avatar) {
    avatar.addEventListener("mouseenter", stopAutoSlide);
    avatar.addEventListener("mouseleave", startAutoSlide);
  }
});
