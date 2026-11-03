
import { db } from "./firebase-config.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Search and filter cards
function filterCards(inputId, selector) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const q = input.value.trim().toLowerCase();

  document.querySelectorAll(selector).forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(q)
      ? ""
      : "none";
  });
}

// Enquiry form
function initEnquiryForm() {
  const form = document.getElementById("enquiryForm");
  if (!form) return;

  const params = new URLSearchParams(location.search);
  const requested = params.get("vehicle");
  const select = document.getElementById("vehicle");

  if (requested && select) {
    for (const opt of select.options) {
      if (opt.text.toLowerCase() === requested.toLowerCase()) {
        select.value = opt.text;
        break;
      }
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const vehicle = select ? select.value : "";
    const message = document.getElementById("message").value.trim();
    const consent = document.getElementById("consent");
    const status = document.getElementById("formMessage");

    if (!/^[A-Za-z .'-]{2,60}$/.test(name)) {
      status.textContent = "Please enter a valid name.";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "Please enter a valid email address.";
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      status.textContent = "Enter a valid 10-digit phone number.";
      return;
    }

    if (!vehicle) {
      status.textContent = "Please select a vehicle.";
      return;
    }

    if (message.length < 5) {
      status.textContent = "Please enter a message of at least 5 characters.";
      return;
    }

    if (consent && !consent.checked) {
      status.textContent = "Please agree before submitting.";
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    status.textContent = "Sending enquiry to Firebase... Please wait.";

    try {
      const saved = await addDoc(collection(db, "enquiries"), {
        name,
        email,
        phone,
        vehicle,
        message,
        createdAt: serverTimestamp()
      });

      console.info("Enquiry saved. Firestore ID:", saved.id);

      status.textContent =
        "SUCCESS! Your enquiry has been saved successfully.";

      form.reset();

    } catch (error) {
      console.error("Firebase submit error:", error);

      status.textContent =
        "ERROR: " + (error.message || "Could not save enquiry.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Submit Enquiry";
      }
    }
  });
}

// Saved enquiry records
async function initEnquiryList() {
  const list = document.getElementById("enquiryRecords");
  if (!list) return;

  const count = document.getElementById("recordCount");
  const clear = document.getElementById("clearEnquiries");

  async function render() {
    list.innerHTML =
      '<div class="empty-state">Loading enquiries...</div>';

    try {
      const snapshot = await getDocs(collection(db, "enquiries"));

      const records = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      }));

      if (count) {
        count.textContent =
          `${records.length} saved ${
            records.length === 1 ? "enquiry" : "enquiries"
          }`;
      }

      if (!records.length) {
        list.innerHTML =
          '<div class="empty-state">No enquiries saved yet.</div>';
        return;
      }

      list.innerHTML = records.map(r => `
        <article class="record">
          <h3>${escapeHTML(r.vehicle)}</h3>
          <p><b>Name:</b> ${escapeHTML(r.name)}</p>
          <p><b>Email:</b> ${escapeHTML(r.email)}</p>
          <p><b>Phone:</b> ${escapeHTML(r.phone)}</p>
          <p><b>Message:</b> ${escapeHTML(r.message)}</p>
          <p><b>Saved:</b> ${
            escapeHTML(
              r.createdAt?.toDate
                ? r.createdAt.toDate().toLocaleString()
                : "Recently"
            )
          }</p>
          <div class="record-actions">
            <button class="btn btn-danger small-btn"
              data-delete="${escapeHTML(r.id)}"
              type="button">Delete</button>
          </div>
        </article>
      `).join("");

      list.querySelectorAll("[data-delete]").forEach(button => {
        button.addEventListener("click", async () => {
          if (!confirm("Delete this enquiry?")) return;

          try {
            await deleteDoc(
              doc(db, "enquiries", button.dataset.delete)
            );
            await render();
          } catch (error) {
            console.error(error);
            alert("Could not delete this enquiry.");
          }
        });
      });

    } catch (error) {
      console.error("Firestore read error:", error);

      list.innerHTML =
        '<div class="empty-state">Unable to load enquiries. Check Firestore access rules.</div>';

      if (count) count.textContent = "Access restricted";
    }
  }

  await render();

  if (clear) {
    clear.addEventListener("click", async () => {
      if (!confirm("Delete ALL enquiries? This cannot be undone.")) {
        return;
      }

      try {
        const snapshot = await getDocs(collection(db, "enquiries"));

        for (const item of snapshot.docs) {
          await deleteDoc(doc(db, "enquiries", item.id));
        }

        await render();

      } catch (error) {
        console.error(error);
        alert("Could not clear enquiries. Check Firestore permissions.");
      }
    });
  }
}

// HTML safety
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));
}

// Initialize pages
document.addEventListener("DOMContentLoaded", () => {
  initEnquiryForm();
  initEnquiryList();
});
