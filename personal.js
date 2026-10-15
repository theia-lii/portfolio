(() => {
  const sections = [
    ["research", "02 / selected projects"],
    ["experience", "03 / experience"],
    ["publications", "04 / publications"]
  ];
  sections.forEach(([id, text]) => {
    const heading = document.querySelector("#" + id + " .section-head h2");
    if (!heading) return;
    const wrapper = document.createElement("div");
    const label = document.createElement("span");
    label.className = "section-index";
    label.textContent = text;
    heading.before(wrapper);
    wrapper.append(label, heading);
  });

  const photos = [
    ["portrait-rain.jpg", "a rainy afternoon in Guilin.", "Hao Li beside a mountain river in Guilin"],
    ["mountains.jpg", "a long view of the Taihang Mountains.", "Sunlit cliffs in the Taihang Mountains"],
    ["coast.jpg", "a little sea breeze in Sanya.", "Blue sea and a coastal walkway in Sanya"],
    ["fireworks.jpg", "a sky full of colour, 2026.", "Fireworks lighting the sky in 2026"],
    ["nus.jpg", "a little time on the NUS campus.", "Hao Li beside a backdrop on the NUS campus"],
    ["winter.jpg", "a quiet winter evening at the Summer Palace.", "Snow-covered buildings by the lake at the Summer Palace"]
  ];
  const viewer = document.querySelector(".photo-viewer");
  const full = document.getElementById("photo-full");
  let selected = 0;
  let source = null;
  function renderPhoto() {
    const [file, caption, alt] = photos[selected];
    full.src = "assets/personal/" + file;
    full.alt = alt;
    document.getElementById("photo-caption").textContent = caption;
    document.getElementById("photo-count").textContent =
      String(selected + 1).padStart(2, "0") + " / " + String(photos.length).padStart(2, "0");
  }
  document.querySelectorAll("[data-photo]").forEach(button => {
    button.addEventListener("click", () => {
      source = button;
      selected = Number(button.dataset.photo);
      renderPhoto();
      viewer.showModal();
      document.body.classList.add("modal-open");
    });
  });
  function changePhoto(delta) {
    selected = (selected + delta + photos.length) % photos.length;
    renderPhoto();
  }
  viewer.querySelector("[data-photo-close]").addEventListener("click", () => viewer.close());
  viewer.querySelector("[data-photo-prev]").addEventListener("click", () => changePhoto(-1));
  viewer.querySelector("[data-photo-next]").addEventListener("click", () => changePhoto(1));
  viewer.addEventListener("click", event => {
    const rect = viewer.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) viewer.close();
  });
  viewer.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    full.removeAttribute("src");
    source?.focus({ preventScroll: true });
  });
  viewer.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      changePhoto(event.key === "ArrowLeft" ? -1 : 1);
    }
  });

  const navigation = document.querySelectorAll(".nav-links a");
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navigation.forEach(link => {
        if (link.hash === "#" + entry.target.id) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-15% 0px -60% 0px", threshold: 0 });
  navigation.forEach(link => {
    const target = document.querySelector(link.hash);
    if (target) sectionObserver.observe(target);
  });
})();
