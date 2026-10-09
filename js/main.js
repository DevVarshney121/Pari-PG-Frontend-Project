
/* Pari PG frontend interactions. Replace CONFIG values with verified contact details. */
const CONFIG = {
  whatsappNumber: "919953598137", // Add country code + number only, e.g. 91XXXXXXXXXX
  phoneDisplay: "Add your phone number",
  email: "Add your email address",
  address: "Pari PG, B-132, Beta 1, near Jagat Farm, Greater Noida, Uttar Pradesh, India"
};
const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(CONFIG.address);
document.querySelectorAll("[data-directions]").forEach(a => a.href = directionsUrl);
document.querySelectorAll("[data-address]").forEach(el => el.textContent = CONFIG.address);
document.querySelectorAll("[data-phone]").forEach(el => el.textContent = CONFIG.phoneDisplay);
document.querySelectorAll("[data-email]").forEach(el => el.textContent = CONFIG.email);
document.querySelectorAll("[data-phone-link]").forEach(a => a.href = "tel:" + CONFIG.phoneDisplay.replace(/\D/g,""));
document.querySelectorAll("[data-map]").forEach(frame => frame.src = "https://maps.google.com/maps?q=" + encodeURIComponent(CONFIG.address) + "&output=embed");

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if(menuToggle && navLinks){menuToggle.addEventListener("click",()=>{const open=navLinks.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));});navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{navLinks.classList.remove("open");menuToggle.setAttribute("aria-expanded","false")}));}

document.querySelectorAll(".faq-question").forEach(btn=>btn.addEventListener("click",()=>{const item=btn.closest(".faq-item");item.classList.toggle("open");btn.setAttribute("aria-expanded",String(item.classList.contains("open")));}));

document.querySelectorAll("[data-room-filter]").forEach(btn=>btn.addEventListener("click",()=>{const filter=btn.dataset.roomFilter;document.querySelectorAll("[data-room-filter]").forEach(b=>b.classList.toggle("active",b===btn));document.querySelectorAll("[data-room-card]").forEach(card=>{card.hidden=filter!=="all" && card.dataset.roomCard!==filter;});}));

document.querySelectorAll("[data-gallery-filter]").forEach(btn=>btn.addEventListener("click",()=>{const filter=btn.dataset.galleryFilter;document.querySelectorAll("[data-gallery-filter]").forEach(b=>b.classList.toggle("active",b===btn));document.querySelectorAll("[data-gallery-category]").forEach(card=>{card.hidden=filter!=="all" && card.dataset.galleryCategory!==filter;});}));


const modalBackdrop = document.querySelector("#roomModal");

function openRoomDetailsModal() {
  if (!modalBackdrop) return;

  modalBackdrop.classList.add("show");
  modalBackdrop.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeRoomDetailsModal() {
  if (!modalBackdrop) return;

  modalBackdrop.classList.remove("show");
  modalBackdrop.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

if (modalBackdrop) {
  document.querySelectorAll("[data-room-details]").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest("[data-room-card]");

      const title =
        card?.querySelector("h3")?.textContent ||
        btn.dataset.roomDetails;

      const price = card?.querySelector(".price")?.textContent || "";
      const img = card?.querySelector("img")?.src || "";

      modalBackdrop.querySelector("[data-modal-title]").textContent = title;
      modalBackdrop.querySelector("[data-modal-price]").textContent = price;

      const modalImage = modalBackdrop.querySelector("[data-modal-image]");
      modalImage.src = img;
      modalImage.alt = title;

      modalBackdrop.querySelector("[data-modal-description]").textContent =
        "Room details are demo content. Please confirm availability, facilities and final price with Pari PG management.";

      modalBackdrop.querySelector("[data-modal-book]").dataset.selectedRoom =
        title;

      openRoomDetailsModal();
    });
  });

  modalBackdrop.querySelectorAll("[data-modal-close]").forEach(button => {
    button.addEventListener("click", closeRoomDetailsModal);
  });

  modalBackdrop.addEventListener("click", event => {
    if (event.target === modalBackdrop) {
      closeRoomDetailsModal();
    }
  });

  modalBackdrop.querySelector("[data-modal-book]")?.addEventListener(
    "click",
    event => {
      sessionStorage.setItem(
        "pariPgSelectedRoom",
        event.currentTarget.dataset.selectedRoom || ""
      );

      closeRoomDetailsModal();
      location.href = "contact.html#contact-form";
    }
  );
}


const lightbox=document.querySelector("#lightbox");
let lightboxItems=[],lightboxIndex=0;
function showLightbox(index){if(!lightbox)return;lightboxItems=[...document.querySelectorAll("[data-lightbox]:not([hidden])")];lightboxIndex=(index+lightboxItems.length)%lightboxItems.length;const item=lightboxItems[lightboxIndex];const img=item.querySelector("img");lightbox.querySelector("img").src=img.src;lightbox.querySelector("img").alt=img.alt;lightbox.querySelector("[data-lightbox-caption]").textContent=item.dataset.caption||img.alt;lightbox.classList.add("show");}
document.querySelectorAll("[data-lightbox]").forEach(item=>item.addEventListener("click",()=>{lightboxItems=[...document.querySelectorAll("[data-lightbox]:not([hidden])")];showLightbox(lightboxItems.indexOf(item));}));
if(lightbox){lightbox.querySelectorAll("[data-lightbox-close]").forEach(b=>b.addEventListener("click",()=>lightbox.classList.remove("show")));lightbox.querySelector("[data-lightbox-prev]")?.addEventListener("click",()=>showLightbox(lightboxIndex-1));lightbox.querySelector("[data-lightbox-next]")?.addEventListener("click",()=>showLightbox(lightboxIndex+1));lightbox.addEventListener("click",e=>{if(e.target===lightbox)lightbox.classList.remove("show")});}
document.addEventListener("keydown",e=>{if (e.key === "Escape") {
  lightbox?.classList.remove("show");
  closeRoomDetailsModal();
}
if(lightbox?.classList.contains("show")&&e.key==="ArrowRight")showLightbox(lightboxIndex+1);if(lightbox?.classList.contains("show")&&e.key==="ArrowLeft")showLightbox(lightboxIndex-1);});

const inquiryForm=document.querySelector("#inquiryForm");
if(inquiryForm){
  const roomSelect=inquiryForm.querySelector('[name="roomType"]');
  const chosen=sessionStorage.getItem("pariPgSelectedRoom");
  if(chosen&&roomSelect){const match=[...roomSelect.options].find(o=>o.text.toLowerCase().includes(chosen.toLowerCase().replace(" room","")));if(match)roomSelect.value=match.value;sessionStorage.removeItem("pariPgSelectedRoom");}
  const notice=inquiryForm.querySelector(".notice");
  
inquiryForm.querySelector("[data-submit-demo]")?.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!inquiryForm.reportValidity()) return;

  const notice = inquiryForm.parentElement.querySelector(".notice");
  const data = Object.fromEntries(new FormData(inquiryForm).entries());

  try {
    const response = await fetch("https://formspree.io/f/mzznvvlj", {
      method: "POST",
      body: new FormData(inquiryForm),
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      notice.style.display = "block";
      notice.textContent = "Thank you! Your inquiry has been submitted successfully.";
      inquiryForm.reset();
   
} else {
  const result = await response.json().catch(() => ({}));

  console.error("Formspree error:", result);

  notice.style.display = "block";
  notice.textContent =
    result.errors?.map(error => error.message).join(", ") ||
    `Submission failed. Error code: ${response.status}`;
}

  } catch (error) {
    notice.style.display = "block";
    notice.textContent = "Network error. Please check your internet and try again.";
  }
});

  inquiryForm.querySelector("[data-send-whatsapp]")?.addEventListener("click",e=>{e.preventDefault();if(!inquiryForm.reportValidity())return;if(!CONFIG.whatsappNumber){notice.style.display="block";notice.textContent="WhatsApp is not configured yet. Add the real WhatsApp number in js/main.js before using this button.";return;}const d=Object.fromEntries(new FormData(inquiryForm).entries());
  
const message =
    `Pari PG Inquiry\n\n` +
    `Name: ${d.name}\n` +
    `Phone: ${d.phone}\n` +
    `Email: ${d.email || "Not provided"}\n` +
    `Room: ${d.roomType}\n` +
    `Move-in: ${d.moveDate || "Not specified"}\n` +
    `Occupants: ${d.occupants || "Not specified"}\n` +
    `Message: ${d.message || "No message"}`;

window.open(
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener"
);
});

}
const backTop=document.querySelector(".back-top");if(backTop){window.addEventListener("scroll",()=>backTop.classList.toggle("show",window.scrollY>450));backTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));}


// Floating WhatsApp button on every page. Add a real number in CONFIG first.
document.querySelectorAll("[data-floating-whatsapp]").forEach(link=>{
  link.addEventListener("click",event=>{
    event.preventDefault();
    if(!CONFIG.whatsappNumber){
      alert("WhatsApp is not configured yet. Please add Pari PG's real WhatsApp number in js/main.js (CONFIG.whatsappNumber).");
      return;
    }
    const msg="Hello Pari PG, I would like to know about room availability, pricing and facilities.";
    window.open("https://wa.me/"+CONFIG.whatsappNumber+"?text="+encodeURIComponent(msg),"_blank","noopener");
  });
});
