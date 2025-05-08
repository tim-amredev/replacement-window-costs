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

  // Add input validation for phone and zip
  const phoneInput = document.getElementById("phone1")
  const zipInput = document.getElementById("zip")
  const stateInput = document.getElementById("state")

  if (phoneInput) {
    // Phone validation - only allow numbers
    phoneInput.addEventListener("input", function (e) {
      // Remove any non-numeric characters
      this.value = this.value.replace(/\D/g, "")

      // Limit to 10 digits
      if (this.value.length > 10) {
        this.value = this.value.slice(0, 10)
      }
    })
  }

  if (zipInput) {
    // Zip code validation - only allow numbers
    zipInput.addEventListener("input", function (e) {
      // Remove any non-numeric characters
      this.value = this.value.replace(/\D/g, "")

      // Limit to 5 digits
      if (this.value.length > 5) {
        this.value = this.value.slice(0, 5)
      }
    })
  }

  if (stateInput) {
    // State code validation - force uppercase
    stateInput.addEventListener("input", function (e) {
      // Convert to uppercase
      this.value = this.value.toUpperCase()

      // Limit to 2 characters
      if (this.value.length > 2) {
        this.value = this.value.slice(0, 2)
      }

      // Only allow letters
      this.value = this.value.replace(/[^A-Z]/g, "")
    })
  }

  // Handle form submission
  quoteForm.addEventListener("submit", (e) => {
    e.preventDefault() // Prevent default form submission

    // Validate required fields for LeadPerfection
    const phone1 = document.getElementById("phone1").value
    const zip = document.getElementById("zip").value

    if (!phone1 || !zip) {
      alert("Please provide a valid phone number and zip code.")
      return
    }

    // Prepare notes field with all form data
    const formData = new FormData(quoteForm)
    let notesContent = "Window Replacement Quote Request:\n\n"

    // Add primary reason
    const primaryReason = document.querySelector('input[name="primary_reason"]:checked')
    if (primaryReason) {
      notesContent += `Primary Reason: ${primaryReason.value}\n`
    }

    // Add window age
    const windowAge = document.querySelector('input[name="window_age"]:checked')
    if (windowAge) {
      notesContent += `Window Age: ${windowAge.value}\n`
    }

    // Add window count range
    const windowCountRange = document.querySelector('input[name="window_count_range"]:checked')
    if (windowCountRange) {
      notesContent += `Window Count Range: ${windowCountRange.value}\n`
    }

    // Add window types
    const windowTypes = document.querySelectorAll('input[name="window_types[]"]:checked')
    if (windowTypes.length > 0) {
      notesContent += "Window Types: "
      windowTypes.forEach((type, index) => {
        notesContent += type.value + (index < windowTypes.length - 1 ? ", " : "")
      })
      notesContent += "\n"
    }

    // Add frame material
    const frameMaterial = document.querySelector('input[name="frame_material"]:checked')
    if (frameMaterial) {
      notesContent += `Frame Material: ${frameMaterial.value}\n`
    }

    // Add glass features
    const glassFeatures = document.querySelectorAll('input[name="glass_features[]"]:checked')
    if (glassFeatures.length > 0) {
      notesContent += "Glass Features: "
      glassFeatures.forEach((feature, index) => {
        notesContent += feature.value + (index < glassFeatures.length - 1 ? ", " : "")
      })
      notesContent += "\n"
    }

    // Add window issues
    const windowIssues = document.querySelectorAll('input[name="window_issues[]"]:checked')
    if (windowIssues.length > 0) {
      notesContent += "Window Issues: "
      windowIssues.forEach((issue, index) => {
        notesContent += issue.value + (index < windowIssues.length - 1 ? ", " : "")
      })
      notesContent += "\n"
    }

    // Add budget
    const budget = document.querySelector('input[name="budget"]:checked')
    if (budget) {
      notesContent += `Budget: ${budget.value}\n`
    }

    // Add timeframe
    const timeframe = document.querySelector('input[name="timeframe"]:checked')
    if (timeframe) {
      notesContent += `Timeframe: ${timeframe.value}\n`
    }

    // Add comments
    const comments = document.getElementById("comments").value
    if (comments) {
      notesContent += `\nAdditional Comments: ${comments}\n`
    }

    // Add estimated price
    const price = estimatedPriceInput.value
    if (price) {
      notesContent += `\nEstimated Price: $${price}\n`
    }

    // Set the notes field
    document.getElementById("lp-notes").value = notesContent

    // Set call time preferences as boolean values
    const callMorning = document.getElementById("contact-phone").checked ? "true" : "false"
    const callAfternoon = document.getElementById("contact-email").checked ? "true" : "false"
    const callEvening = document.getElementById("contact-text").checked ? "true" : "false"
    const callWeekend = document.getElementById("contact-inperson").checked ? "true" : "false"

    // Add hidden fields for call preferences
    appendHiddenField("callmorning", callMorning)
    appendHiddenField("callafternoon", callAfternoon)
    appendHiddenField("callevening", callEvening)
    appendHiddenField("callweekend", callWeekend)

    // Extract zip code from address and add it as a separate field
    if (zip) {
      appendHiddenField("zip", zip)
    }

    // Store the thank you URL in localStorage to redirect after form submission
    const baseThankYouUrl = thankYouUrl.value.split("?")[0]
    const redirectUrl = `${baseThankYouUrl}?price=${price}`
    localStorage.setItem("redirectUrl", redirectUrl)

    // Submit the form to LeadPerfection
    quoteForm.submit()
  })

  // Update the form handler to use the price range
  function updateEstimatedPrice() {
    const windowCount = Number.parseInt(document.getElementById("window-count").value)
    const windowType = document.getElementById("window-type").value
    const frameMaterial = document.getElementById("frame-material").value
    const windowSize = document.getElementById("window-size").value

    // Get grid options if available
    const hasGrids = document.getElementById("grids-yes") && document.getElementById("grids-yes").checked
    const gridType =
      hasGrids && document.getElementById("grid-type") ? document.getElementById("grid-type").value : null
    const gridPattern =
      hasGrids && document.getElementById("grid-pattern") ? document.getElementById("grid-pattern").value : null

    // Get color and hardware options if available
    const exteriorColor = document.getElementById("exterior-color")
      ? document.getElementById("exterior-color").value
      : "white"

    // Get interior color and hardware from radio buttons
    const interiorColor = document.querySelector('input[name="interior_color"]:checked')?.value || "white"
    const hardware = document.querySelector('input[name="hardware"]:checked')?.value || "white"

    // Calculate price using the same logic as the calculator
    const { totalPrice } = calculateDetailedPrice(
      windowCount,
      windowType,
      frameMaterial,
      windowSize,
      "none", // screenType
      hasGrids,
      gridType,
      gridPattern,
      exteriorColor,
      interiorColor,
      hardware,
    )

    // Update hidden input
    estimatedPriceInput.value = totalPrice
  }

  function calculateDetailedPrice(
    count,
    type,
    material,
    size,
    screenType = "none",
    hasGrids = false,
    gridType = null,
    gridPattern = null,
    exteriorColor = "white",
    interiorColor = "white",
    hardware = "white",
  ) {
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
      case "single-hung":
        baseWindowPrice -= 25
        break
      case "sliding":
        baseWindowPrice += 25
        break
      case "picture":
        baseWindowPrice += 75
        break
      case "awning":
        baseWindowPrice += 60
        break
      case "hopper":
        baseWindowPrice += 40
        break
      case "garden":
        baseWindowPrice += 150
        break
      case "storm":
        baseWindowPrice -= 50
        break
      case "skylight":
        baseWindowPrice += 250
        break
      case "jalousie":
        baseWindowPrice += 30
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
      case "aluminum":
        baseWindowPrice += 50
        break
      case "composite":
        baseWindowPrice += 125
        break
      case "wood-clad":
        baseWindowPrice += 175
        break
      case "steel":
        baseWindowPrice += 200
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

    // Adjustments for screen type
    if (screenType) {
      switch (screenType) {
        case "none":
          baseWindowPrice += 0
          break
        case "half":
          baseWindowPrice += 25
          break
        case "full":
          baseWindowPrice += 50
          break
      }
    }

    // Adjustments for grids
    if (hasGrids) {
      baseWindowPrice += 75

      // Additional adjustments for grid type
      if (gridType) {
        switch (gridType) {
          case "flat":
            baseWindowPrice += 0
            break
          case "contour":
            baseWindowPrice += 25
            break
          case "sdl":
            baseWindowPrice += 50
            break
        }
      }

      // Additional adjustments for grid pattern
      if (gridPattern) {
        switch (gridPattern) {
          case "colonial":
            baseWindowPrice += 0
            break
          case "prairie":
            baseWindowPrice += 15
            break
          case "diamond":
            baseWindowPrice += 30
            break
        }
      }
    }

    // Adjustments for exterior color
    if (exteriorColor && exteriorColor !== "white") {
      baseWindowPrice += 35
    }

    // Adjustments for interior color
    if (interiorColor && interiorColor !== "white") {
      baseWindowPrice += 45
    }

    // Adjustments for hardware
    if (hardware) {
      switch (hardware) {
        case "white":
          baseWindowPrice += 0
          break
        case "matte-bronze":
          baseWindowPrice += 20
          break
        case "brushed-nickel":
          baseWindowPrice += 25
          break
        case "antique-brass":
          baseWindowPrice += 30
          break
      }
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
      case "single-hung":
        baseInstallCost -= 10
        break
      case "sliding":
        baseInstallCost += 15
        break
      case "picture":
        baseInstallCost += 20
        break
      case "awning":
        baseInstallCost += 30
        break
      case "hopper":
        baseInstallCost += 20
        break
      case "garden":
        baseInstallCost += 100
        break
      case "storm":
        baseInstallCost -= 25
        break
      case "skylight":
        baseInstallCost += 200
        break
      case "jalousie":
        baseInstallCost += 15
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
      case "aluminum":
        baseInstallCost += 25
        break
      case "composite":
        baseInstallCost += 60
        break
      case "wood-clad":
        baseInstallCost += 85
        break
      case "steel":
        baseInstallCost += 100
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

    // Installation adjustments for grids
    if (hasGrids) {
      baseInstallCost += 15
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

    // Setup grid options toggle
    const gridsYes = document.getElementById("grids-yes")
    const gridsNo = document.getElementById("grids-no")
    const gridOptions = document.querySelector(".grid-options")

    if (gridsYes && gridsNo && gridOptions) {
      function toggleGridOptions() {
        gridOptions.style.display = gridsYes.checked ? "flex" : "none"
      }

      gridsYes.addEventListener("change", toggleGridOptions)
      gridsNo.addEventListener("change", toggleGridOptions)

      // Initial state
      toggleGridOptions()
    }

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

  // Helper function to append hidden fields
  function appendHiddenField(name, value) {
    const input = document.createElement("input")
    input.type = "hidden"
    input.name = name
    input.value = value
    quoteForm.appendChild(input)
  }
})

// Check if we need to redirect after form submission
window.addEventListener("load", () => {
  const redirectUrl = localStorage.getItem("redirectUrl")
  if (redirectUrl) {
    localStorage.removeItem("redirectUrl")
    window.location.href = redirectUrl
  }
})
