document.addEventListener("DOMContentLoaded", () => {
  const quoteForm = document.getElementById("quote-form")
  const thankYouUrl = document.getElementById("thank-you-url")
  const estimatedPriceInput = document.getElementById("estimated-price")

  // Parse URL parameters and pre-fill form
  const urlParams = new URLSearchParams(window.location.search)

  if (urlParams.has("count")) {
    document.getElementById("window-count").value = urlParams.get("count")

    // Try to select the appropriate radio button for window count range
    const count = Number.parseInt(urlParams.get("count"))
    if (count >= 1 && count <= 3) {
      document.getElementById("count-1to3").checked = true
    } else if (count >= 4 && count <= 6) {
      document.getElementById("count-4to6").checked = true
    } else if (count >= 7 && count <= 10) {
      document.getElementById("count-7to10").checked = true
    } else if (count >= 11 && count <= 15) {
      document.getElementById("count-11to15").checked = true
    } else if (count >= 16 && count <= 20) {
      document.getElementById("count-16to20").checked = true
    }
  }

  if (urlParams.has("type")) {
    document.getElementById("window-type").value = urlParams.get("type")

    // Try to select the appropriate radio button for window type
    const type = urlParams.get("type")
    if (type === "double-hung") {
      document.getElementById("type-double").checked = true
    } else if (type === "casement") {
      document.getElementById("type-casement").checked = true
    } else if (type === "bay") {
      document.getElementById("type-bay").checked = true
    }
  }

  if (urlParams.has("material")) {
    document.getElementById("frame-material").value = urlParams.get("material")

    // Try to select the appropriate radio button for material
    const material = urlParams.get("material")
    if (material === "vinyl") {
      document.getElementById("material-vinyl").checked = true
    } else if (material === "wood") {
      document.getElementById("material-wood").checked = true
    } else if (material === "fiberglass") {
      document.getElementById("material-fiberglass").checked = true
    }
  }

  if (urlParams.has("size")) {
    document.getElementById("window-size").value = urlParams.get("size")
  }

  // Calculate initial price if parameters are present
  if (urlParams.has("price")) {
    estimatedPriceInput.value = urlParams.get("price")
  } else {
    updateEstimatedPrice()
  }

  // Update price when form fields change
  document.getElementById("window-count").addEventListener("change", updateEstimatedPrice)
  document.getElementById("window-type").addEventListener("change", updateEstimatedPrice)
  document.getElementById("frame-material").addEventListener("change", updateEstimatedPrice)
  document.getElementById("window-size").addEventListener("change", updateEstimatedPrice)

  // Handle "Other" options
  setupOtherInputs()

  // Handle form submission
  quoteForm.addEventListener("submit", (e) => {
    // Update the thank you URL with the estimated price
    const baseThankYouUrl = thankYouUrl.value.split("?")[0]
    const price = estimatedPriceInput.value

    thankYouUrl.value = `${baseThankYouUrl}?price=${price}`
  })

  function updateEstimatedPrice() {
    const windowCount = Number.parseInt(document.getElementById("window-count").value)
    const windowType = document.getElementById("window-type").value
    const frameMaterial = document.getElementById("frame-material").value
    const windowSize = document.getElementById("window-size").value

    // Calculate price using the same logic as the calculator
    const { totalPrice } = calculateDetailedPrice(windowCount, windowType, frameMaterial, windowSize)

    // Update hidden input
    estimatedPriceInput.value = totalPrice
  }

  function calculateDetailedPrice(count, type, material, size) {
    // Base price per window
    let baseWindowPrice = 300

    // Adjustments for window type
    switch (type) {
      case "double-hung":
        baseWindowPrice += 0
        break
      case "casement":
        baseWindowPrice += 50
        break
      case "bay":
        baseWindowPrice += 200
        break
    }

    // Adjustments for frame material
    switch (material) {
      case "vinyl":
        baseWindowPrice += 0
        break
      case "wood":
        baseWindowPrice += 100
        break
      case "fiberglass":
        baseWindowPrice += 150
        break
    }

    // Adjustments for window size
    switch (size) {
      case "small":
        baseWindowPrice += 0
        break
      case "medium":
        baseWindowPrice += 100
        break
      case "large":
        baseWindowPrice += 200
        break
    }

    // Calculate window cost
    const windowCost = baseWindowPrice * count

    // Calculate installation cost (varies by type, material, and size)
    let baseInstallCost = 150 // Base installation cost per window

    // Installation adjustments for window type
    switch (type) {
      case "double-hung":
        baseInstallCost += 0
        break
      case "casement":
        baseInstallCost += 25
        break
      case "bay":
        baseInstallCost += 150
        break
    }

    // Installation adjustments for material (some materials are harder to install)
    switch (material) {
      case "vinyl":
        baseInstallCost += 0
        break
      case "wood":
        baseInstallCost += 50
        break
      case "fiberglass":
        baseInstallCost += 75
        break
    }

    // Installation adjustments for size
    switch (size) {
      case "small":
        baseInstallCost += 0
        break
      case "medium":
        baseInstallCost += 50
        break
      case "large":
        baseInstallCost += 100
        break
    }

    // Calculate total installation cost
    const installationCost = baseInstallCost * count

    // Calculate subtotal before commission
    const subtotal = windowCost + installationCost

    // Add commission (typically 15-20% in home improvement)
    const commissionRate = 0.18 // 18%
    const commission = Math.round(subtotal * commissionRate)

    // Calculate total price
    const totalPrice = subtotal + commission

    return {
      windowCost,
      installationCost,
      commission,
      totalPrice,
    }
  }

  function setupOtherInputs() {
    // Setup all "Other" radio buttons to show/hide their text inputs
    const otherRadios = document.querySelectorAll('input[type="radio"][id$="-other"]')
    otherRadios.forEach((radio) => {
      const textInput = document.getElementById(radio.id + "-text")
      if (textInput) {
        // Initial state
        textInput.style.display = radio.checked ? "block" : "none"

        // Add event listener
        radio.addEventListener("change", function () {
          textInput.style.display = this.checked ? "block" : "none"
        })
      }
    })

    // Setup all "Other" checkboxes to show/hide their text inputs
    const otherCheckboxes = document.querySelectorAll('input[type="checkbox"][id$="-other"]')
    otherCheckboxes.forEach((checkbox) => {
      const textInput = document.getElementById(checkbox.id + "-text")
      if (textInput) {
        // Initial state
        textInput.style.display = checkbox.checked ? "block" : "none"

        // Add event listener
        checkbox.addEventListener("change", function () {
          textInput.style.display = this.checked ? "block" : "none"
        })
      }
    })

    // Setup terms and privacy policy links to prevent form submission when clicked
    const termsLink = document.querySelector(".terms-link")
    const privacyLink = document.querySelector(".privacy-link")

    if (termsLink) {
      termsLink.addEventListener("click", (e) => {
        e.preventDefault()
        alert("Terms of Service would open in a new window. This is a placeholder.")
      })
    }

    if (privacyLink) {
      privacyLink.addEventListener("click", (e) => {
        e.preventDefault()
        alert("Privacy Policy would open in a new window. This is a placeholder.")
      })
    }
  }
})

