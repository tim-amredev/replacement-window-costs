// NOTE: Replace [LPCLIENTID] with your actual LeadPerfection client ID before deploying

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

    // Try to select the appropriate checkbox for window type
    const type = urlParams.get("type")
    if (type === "double-hung") {
      document.getElementById("type-double").checked = true
    } else if (type === "casement") {
      document.getElementById("type-casement").checked = true
    } else if (type === "2-lite-slider") {
      document.getElementById("type-2-lite-slider").checked = true
    } else if (type === "3-lite-slider") {
      document.getElementById("type-3-lite-slider").checked = true
    } else if (type === "picture") {
      document.getElementById("type-picture").checked = true
    } else if (type === "awning") {
      document.getElementById("type-awning").checked = true
    }
  }

  if (urlParams.has("material")) {
    document.getElementById("frame-material").value = urlParams.get("material")
  }

  if (urlParams.has("size")) {
    document.getElementById("window-size").value = urlParams.get("size")
  }

  if (urlParams.has("screen")) {
    document.getElementById("screen-type").value = urlParams.get("screen")
  }

  if (urlParams.has("grids")) {
    const gridsValue = urlParams.get("grids")
    if (gridsValue === "yes") {
      document.getElementById("grids-yes").checked = true
    } else {
      document.getElementById("grids-no").checked = true
    }
  }

  // Pre-fill color and hardware options if available
  if (urlParams.has("exteriorColor")) {
    const exteriorColor = urlParams.get("exteriorColor")
    const exteriorColorInput = document.querySelector(`input[name="exterior_color"][value="${exteriorColor}"]`)
    if (exteriorColorInput) {
      exteriorColorInput.checked = true
    }
  }

  if (urlParams.has("interiorColor")) {
    const interiorColor = urlParams.get("interiorColor")
    const interiorColorInput = document.querySelector(`input[name="interior_color"][value="${interiorColor}"]`)
    if (interiorColorInput) {
      interiorColorInput.checked = true
    }
  }

  if (urlParams.has("hardware")) {
    const hardware = urlParams.get("hardware")
    const hardwareInput = document.querySelector(`input[name="hardware"][value="${hardware}"]`)
    if (hardwareInput) {
      hardwareInput.checked = true
    }
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
  document.getElementById("screen-type").addEventListener("change", updateEstimatedPrice)

  // Update price when color and hardware options change
  const colorOptions = document.querySelectorAll('input[name="exterior_color"], input[name="interior_color"]')
  colorOptions.forEach((option) => {
    option.addEventListener("change", updateEstimatedPrice)
  })

  const hardwareOptions = document.querySelectorAll('input[name="hardware"]')
  hardwareOptions.forEach((option) => {
    option.addEventListener("change", updateEstimatedPrice)
  })

  // Handle "Other" options
  setupOtherInputs()

  // Add input validation for phone and zip
  const phoneInput = document.getElementById("phone")
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

    // Validate required fields
    const termsConsent = document.getElementById("terms-consent").checked
    const zip = document.getElementById("zip").value
    const phone = document.getElementById("phone").value

    if (!termsConsent) {
      alert("Please agree to the Terms of Service and Privacy Policy.")
      return
    }

    if (!zip || !phone) {
      alert("Zip code and phone number are required fields.")
      return
    }

    // Get window specifications
    const windowCount = Number.parseInt(document.getElementById("window-count").value)
    const windowType = document.getElementById("window-type").value
    const frameMaterial = document.getElementById("frame-material").value
    const windowSize = document.getElementById("window-size").value
    const screenType = document.getElementById("screen-type").value
    const hasGrids = document.querySelector('input[name="grids"]:checked').value === "yes"

    // Get color and hardware selections
    const exteriorColor = document.querySelector('input[name="exterior_color"]:checked').value
    const interiorColor = document.querySelector('input[name="interior_color"]:checked').value
    const hardware = document.querySelector('input[name="hardware"]:checked').value

    // Calculate price
    const { totalPrice } = calculateDetailedPrice(
      windowCount,
      windowType,
      frameMaterial,
      windowSize,
      screenType,
      hasGrids,
      exteriorColor,
      interiorColor,
      hardware,
    )

    // Calculate price range (20% below and above)
    const lowerPrice = Math.round(totalPrice * 0.8)
    const upperPrice = Math.round(totalPrice * 1.2)

    // Get form data for LeadPerfection
    const firstName = document.getElementById("first-name").value
    const lastName = document.getElementById("last-name").value
    const email = document.getElementById("email").value
    const address = document.getElementById("address").value
    const city = document.getElementById("city").value
    const state = document.getElementById("state").value

    // Get best time to call preferences
    const callMorning = document.getElementById("contact-morning")
      ? document.getElementById("contact-morning").checked
      : false
    const callAfternoon = document.getElementById("contact-afternoon")
      ? document.getElementById("contact-afternoon").checked
      : false
    const callEvening = document.getElementById("contact-evening")
      ? document.getElementById("contact-evening").checked
      : false
    const callWeekend = document.getElementById("contact-weekend")
      ? document.getElementById("contact-weekend").checked
      : false

    // Get additional notes
    const comments = document.getElementById("comments").value

    // Prepare notes with all form data
    let notesContent = "Window Replacement Quote Request:\n\n"

    // Add window specifications
    notesContent += `Window Count: ${windowCount}\n`
    notesContent += `Window Type: ${windowType}\n`
    notesContent += `Frame Material: ${frameMaterial}\n`
    notesContent += `Window Size: ${windowSize}\n`
    notesContent += `Screen Type: ${screenType}\n`
    notesContent += `Grids: ${hasGrids ? "Yes" : "No"}\n`
    notesContent += `Exterior Color: ${exteriorColor}\n`
    notesContent += `Interior Color: ${interiorColor}\n`
    notesContent += `Hardware: ${hardware}\n\n`

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
    if (comments) {
      notesContent += `\nAdditional Comments: ${comments}\n`
    }

    // Add estimated price
    notesContent += `\nEstimated Price Range: $${lowerPrice.toLocaleString()} - $${upperPrice.toLocaleString()}\n`

    // Create form data for LeadPerfection
    const leadPerfectionData = new URLSearchParams()

    // Required fields
    leadPerfectionData.append("firstname", firstName)
    leadPerfectionData.append("lastname", lastName)
    leadPerfectionData.append("address1", address)
    leadPerfectionData.append("city", city)
    leadPerfectionData.append("state", state)
    leadPerfectionData.append("zip", zip) // Required
    leadPerfectionData.append("phone1", phone) // Required
    leadPerfectionData.append("email", email)
    leadPerfectionData.append("sender", "replacementwindowcosts.com") // Required - exact value
    leadPerfectionData.append("srs_id", "1672") // Required - exact value
    leadPerfectionData.append("notes", notesContent)

    // Best time to call indicators
    leadPerfectionData.append("callmorning", callMorning)
    leadPerfectionData.append("callafternoon", callAfternoon)
    leadPerfectionData.append("callevening", callEvening)
    leadPerfectionData.append("callweekend", callWeekend)

    // Product information
    leadPerfectionData.append("productid", "WINDOWS")
    leadPerfectionData.append("proddescr", "Window Replacement")

    // Store the thank you URL in localStorage to redirect after form submission
    const baseThankYouUrl = thankYouUrl.value.split("?")[0]
    const redirectUrl = `${baseThankYouUrl}?price=${totalPrice}&lowerPrice=${lowerPrice}&upperPrice=${upperPrice}&count=${windowCount}&type=${windowType}&material=${frameMaterial}&size=${windowSize}&exteriorColor=${exteriorColor}&interiorColor=${interiorColor}&hardware=${hardware}`
    localStorage.setItem("redirectUrl", redirectUrl)

    // Send data to LeadPerfection - UPDATED URL
    fetch("https://th97.leadperfection.com/batch/addleads.asp", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: leadPerfectionData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.includes("[OK]")) {
          // Successful submission
          window.location.href = redirectUrl
        } else {
          // Failed submission
          console.error("LeadPerfection error:", data)
          alert("There was an error submitting your request. Please try again later.")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        alert("There was an error submitting your request. Please try again later.")
      })
  })

  // Update the form handler to use the price range
  function updateEstimatedPrice() {
    const windowCount = Number.parseInt(document.getElementById("window-count").value)
    const windowType = document.getElementById("window-type").value
    const frameMaterial = document.getElementById("frame-material").value
    const windowSize = document.getElementById("window-size").value
    const screenType = document.getElementById("screen-type").value

    // Get grid options
    const hasGrids = document.querySelector('input[name="grids"]:checked').value === "yes"

    // Get color and hardware options
    const exteriorColor = document.querySelector('input[name="exterior_color"]:checked').value
    const interiorColor = document.querySelector('input[name="interior_color"]:checked').value
    const hardware = document.querySelector('input[name="hardware"]:checked').value

    // Calculate price
    const { totalPrice } = calculateDetailedPrice(
      windowCount,
      windowType,
      frameMaterial,
      windowSize,
      screenType,
      hasGrids,
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
    exteriorColor = "white",
    interiorColor = "white",
    hardware = "white",
  ) {
    // Base price per window
    let baseWindowPrice = 799

    // Adjustments for window type
    switch (type) {
      case "double-hung":
        baseWindowPrice += 0
        break
      case "casement":
        baseWindowPrice += 44
        break
      case "2-lite-slider":
        baseWindowPrice += 23
        break
      case "3-lite-slider":
        baseWindowPrice += 785
        break
      case "picture":
        baseWindowPrice += 19
        break
      case "awning":
        baseWindowPrice += 32
        break
    }

    // Adjustments for frame material
    switch (material) {
      case "vinyl":
        baseWindowPrice += 0
        break
      case "composite":
        baseWindowPrice += 572
        break
    }

    // Adjustments for window size
    switch (size) {
      case "small":
        baseWindowPrice += 0
        break
      case "medium":
        baseWindowPrice += 136
        break
      case "large":
        baseWindowPrice += 289
        break
    }

    // Adjustments for screen type
    switch (screenType) {
      case "none":
        baseWindowPrice += 0
        break
      case "half":
        baseWindowPrice += 14
        break
      case "full":
        baseWindowPrice += 27
        break
    }

    // Adjustments for grids
    if (hasGrids) {
      baseWindowPrice += 89
    }

    // Adjustments for exterior color
    if (exteriorColor && exteriorColor !== "white") {
      baseWindowPrice += 99
    }

    // Adjustments for interior color
    if (interiorColor && interiorColor !== "white") {
      baseWindowPrice += 99
    }

    // Adjustments for hardware
    if (hardware && hardware !== "white") {
      baseWindowPrice += 52
    }

    // Calculate window cost
    const windowCost = baseWindowPrice * count

    // Calculate installation cost (varies by type, material, and size)
    const baseInstallCost = 0 // Base installation cost per window

    // Calculate total installation cost
    const installationCost = baseInstallCost * count

    // Calculate subtotal before commission
    const subtotal = windowCost + installationCost

    // Add commission (typically 15-20% in home improvement)
    const commissionRate = 0.11 // 11%
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

  // Improve mobile experience

  // Fix for iOS form submission issues
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    // Add specific handling for iOS devices
    quoteForm.addEventListener("submit", function (e) {
      // Prevent double submission on iOS
      if (this.hasAttribute("data-submitting")) {
        e.preventDefault()
        return
      }

      this.setAttribute("data-submitting", "true")

      // Remove the attribute after a delay to allow resubmission if needed
      setTimeout(() => {
        this.removeAttribute("data-submitting")
      }, 3000)
    })
  }

  // Ensure proper display on mobile orientation change
  window.addEventListener("orientationchange", () => {
    // Small delay to allow the browser to complete the orientation change
    setTimeout(() => {
      // Force redraw of color and hardware options
      const colorOptions = document.querySelectorAll(".color-options")
      const hardwareOptions = document.querySelectorAll(".hardware-options")

      colorOptions.forEach((el) => {
        el.style.display = "none"
        setTimeout(() => {
          el.style.display = ""
        }, 50)
      })

      hardwareOptions.forEach((el) => {
        el.style.display = "none"
        setTimeout(() => {
          el.style.display = ""
        }, 50)
      })
    }, 300)
  })

  // Improve scrolling to form sections on mobile
  const formSections = document.querySelectorAll(".form-section")
  formSections.forEach((section) => {
    const heading = section.querySelector("h3")
    if (heading) {
      heading.addEventListener("click", function () {
        // Add a small visual feedback
        this.style.opacity = "0.7"
        setTimeout(() => {
          this.style.opacity = "1"
        }, 200)

        // Scroll the section into view with offset for fixed header
        const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0
        const yOffset = -headerHeight - 20
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset

        window.scrollTo({ top: y, behavior: "smooth" })
      })

      // Add visual cue that headings are clickable
      heading.style.cursor = "pointer"
    }
  })
})

// Check if we need to redirect after form submission
window.addEventListener("load", () => {
  const redirectUrl = localStorage.getItem("redirectUrl")
  if (redirectUrl) {
    localStorage.removeItem("redirectUrl")
    window.location.href = redirectUrl
  }
})
