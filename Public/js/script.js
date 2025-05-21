// ---------- Personnel Form----------
document.addEventListener("DOMContentLoaded", function () {
  const personnelForm = document.getElementById("personnelForm");

  if (personnelForm) {
    personnelForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const error = document.getElementById("errorMessage");
      error.textContent = "";

      const userId = document.getElementById("userId").value.trim();
      const nationalCode = document.getElementById("nationalCode").value.trim();
      const idNumber = document.getElementById("idNumber").value.trim();
      const phone = document.getElementById("phone").value.trim();

      if (!/^\d{10}$/.test(nationalCode)) {
        error.textContent = "کد ملی باید دقیقاً ۱۰ رقم باشد.";
        return;
      }

      if (!/^\d{1,10}$/.test(idNumber)) {
        error.textContent = "شماره شناسنامه باید حداکثر ۱۰ رقم عددی باشد.";
        return;
      }

      if (!/^09\d{9}$/.test(phone)) {
        error.textContent = "شماره تماس باید با 09 شروع شده و ۱۱ رقم باشد.";
        return;
      }

      if (userId === "") {
        error.textContent = "شناسه کاربر الزامی است.";
        return;
      }

      alert("اطلاعات با موفقیت ثبت شد!");
      window.location.href = "ProductForm.html";
      this.reset();
    });
  }

  // ---------- Product Form----------
  const productForm = document.getElementById("productForm");

  if (productForm) {
    productForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const data = {
        customerName: document.getElementById("customerName").value,
        invoiceNumber: document.getElementById("invoiceNumber").value,
        invoiceDate: document.getElementById("invoiceDate").value,
        productCode: document.getElementById("productCode").value,
        productName: document.getElementById("productName").value,
        quantity: parseFloat(document.getElementById("quantity").value),
        unit: document.getElementById("unit").value,
        rate: parseFloat(document.getElementById("rate").value),
        amount: parseFloat(document.getElementById("amount").value),
        receiver: document.getElementById("receiver").value,
        deliverer: document.getElementById("deliverer").value,
        returnable:
          document.querySelector('input[name="returnable"]:checked')?.value ||
          "نامشخص",
      };

      localStorage.setItem("invoiceData", JSON.stringify(data));
      window.location.href = "Invoice.html";
    });
  }

  // ---------- Invoice Display----------
  if (document.getElementById("invoiceDisplay")) {
    const data = JSON.parse(localStorage.getItem("invoiceData"));

    if (data) {
      document.getElementById("customerName").textContent = data.customerName;
      document.getElementById("invoiceNumber").textContent = data.invoiceNumber;
      document.getElementById("invoiceDate").textContent = data.invoiceDate;
      document.getElementById("productCode").textContent = data.productCode;
      document.getElementById("productName").textContent = data.productName;
      document.getElementById("quantity").textContent = data.quantity;
      document.getElementById("unit").textContent = data.unit;
      document.getElementById("rate").textContent = data.rate.toLocaleString();
      document.getElementById("amount").textContent =
        data.amount.toLocaleString();
      document.getElementById("totalPrice").textContent = (
        data.rate * data.amount
      ).toLocaleString();
      document.getElementById("receiver").textContent = data.receiver;
      document.getElementById("deliverer").textContent = data.deliverer;
      document.getElementById("returnable").textContent = data.returnable;
    }
  }
});
