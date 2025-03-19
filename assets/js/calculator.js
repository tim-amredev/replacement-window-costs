document.addEventListener("DOMContentLoaded", () => {
  const calculatorForm = document.getElementById("calculator-form")
  const calculatorResult = document.getElementById("calculator-result")
  const estimatedPrice = document.getElementById("estimated-price")
  const requestQuoteBtn = document.getElementById("request-quote-btn")
  const breakdownContainer = document.getElementById("price-breakdown")
  const windowCostElement = document.getElementById("window-cost")
  const installationCostElement = document.getElementById("installation-cost")
  const commissionElement = document.getElementById("commission")
  const totalCostElement = document.getElementById("total-cost")

  // Add input validation for phone and zip when the page loads
  const phoneInput = document.getElementById("lp-phone1")
  const zipInput = document.getElementById("lp-zip")
  const stateInput = document.getElementById("lp-state")

  // Phone validation - only allow numbers
  phoneInput.addEventListener("input", function (e) {
    // Remove any non-numeric characters
    this.value = this.value.replace(/\D/g, "")

    // Limit to 10 digits
    if (this.value.length > 10) {
      this.value = this.value.slice(0, 10)
    }
  })

  // Zip code validation - only allow numbers
  zipInput.addEventListener("input", function (e) {
    // Remove any non-numeric characters
    this.value = this.value.replace(/\D/g, "")

    // Limit to 5 digits
    if (this.value.length > 5) {
      this.value = this.value.slice(0, 5)
    }
  })

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

  // Update the calculateDetailedPrice function to include the new options
  function calculateDetailedPrice(
    count,
    type,
    material,
    size,
    screenType,
    hasGrids,
    gridType,
    gridPattern,
    exteriorColor,
    interiorColor,
    hardware,
  ) {
    // Base price per window
    let baseWindowPrice = 300

    // Adjustments for window type
    switch (type) {
      case "single-hung":
        baseWindowPrice -= 25
        break
      case "double-hung":
        baseWindowPrice += 0
        break
      case "casement":
        baseWindowPrice += 50
        break
      case "sliding":
        baseWindowPrice += 25
        break
      case "picture":
        baseWindowPrice += 75
        break
      case "bay":
        baseWindowPrice += 200
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
      case "single-hung":
        baseInstallCost -= 10
        break
      case "double-hung":
        baseInstallCost += 0
        break
      case "casement":
        baseInstallCost += 25
        break
      case "sliding":
        baseInstallCost += 15
        break
      case "picture":
        baseInstallCost += 20
        break
      case "bay":
        baseInstallCost += 150
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

    // Installation adjustments for screens
    switch (screenType) {
      case "none":
        baseInstallCost += 0
        break
      case "half":
        baseInstallCost += 10
        break
      case "full":
        baseInstallCost += 20
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

  // Update the form submission handler to include the new fields
  calculatorForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Validate required fields
    if (!calculatorForm.checkValidity()) {
      alert("Please fill out all required fields before calculating cost.")
      return
    }

    // Setup the save estimate button
    const saveEstimateBtn = document.getElementById("save-estimate-btn")
    const leadCaptureForm = document.getElementById("lead-capture-form")

    saveEstimateBtn.addEventListener("click", () => {
      leadCaptureForm.style.display = "block"
      saveEstimateBtn.style.display = "none"

      // Populate hidden fields for LeadPerfection
      populateLeadPerfectionFields()

      // Scroll to the form
      leadCaptureForm.scrollIntoView({ behavior: "smooth" })
    })

    // Handle the quick lead form submission
    const quickLeadForm = document.getElementById("quick-lead-form")
    quickLeadForm.addEventListener("submit", (e) => {
      e.preventDefault() // Prevent default submission

      // Validate the main form fields
      if (!calculatorForm.checkValidity()) {
        alert("Please fill out all required fields in the form above.")
        return
      }

      // Populate all fields for LeadPerfection
      populateLeadPerfectionFields()

      // Prepare the thank you URL
      const site = { baseurl: "" } // Define site variable
      const thankYouUrl = `${window.location.origin}${site.baseurl}/thankyou.html?price=${estimatedPrice.textContent.replace(/[^0-9]/g, "")}`

      // Create a hidden iframe to submit the form
      const iframe = document.createElement("iframe")
      iframe.name = "hidden_iframe"
      iframe.style.display = "none"
      document.body.appendChild(iframe)

      // Set the form target to the hidden iframe
      quickLeadForm.target = "hidden_iframe"

      // Add event listener to redirect after form submission
      iframe.addEventListener("load", () => {
        window.location.href = thankYouUrl
      })

      // Submit the form
      quickLeadForm.submit()
    })

    // Get form values
    const windowCount = Number.parseInt(document.getElementById("window-count").value)
    const windowType = document.getElementById("window-type").value
    const frameMaterial = document.getElementById("frame-material").value
    const windowSize = document.getElementById("window-size").value
    const screenType = document.getElementById("screen-type").value
    const hasGrids = document.querySelector('input[name="grids"]:checked').value === "yes"

    // Get new form values
    const gridType = hasGrids ? document.getElementById("grid-type").value : null
    const gridPattern = hasGrids ? document.getElementById("grid-pattern").value : null
    const exteriorColor = document.querySelector('input[name="exterior-color"]:checked').value
    const interiorColor = document.querySelector('input[name="interior-color"]:checked').value
    const hardware = document.querySelector('input[name="hardware"]:checked').value

    // Calculate prices
    const { windowCost, installationCost, commission, totalPrice } = calculateDetailedPrice(
      windowCount,
      windowType,
      frameMaterial,
      windowSize,
      screenType,
      hasGrids,
      gridType,
      gridPattern,
      exteriorColor,
      interiorColor,
      hardware,
    )

    // Display result with animation
    estimatedPrice.textContent = "$" + totalPrice.toLocaleString()

    // Update price breakdown
    windowCostElement.textContent = "$" + windowCost.toLocaleString()
    installationCostElement.textContent = "$" + installationCost.toLocaleString()
    commissionElement.textContent = "$" + commission.toLocaleString()
    totalCostElement.textContent = "$" + totalPrice.toLocaleString()

    calculatorResult.style.display = "block"

    // Reset the lead capture form and buttons when showing new results
    leadCaptureForm.style.display = "none"
    saveEstimateBtn.style.display = "inline-flex"

    breakdownContainer.style.display = "block"
    calculatorResult.classList.add("fadeIn")

    // Update request quote button URL
    const baseUrl = requestQuoteBtn.getAttribute("href").split("?")[0]
    const queryParams = new URLSearchParams({
      count: windowCount,
      type: windowType,
      material: frameMaterial,
      size: windowSize,
      screen: screenType,
      grids: hasGrids ? "yes" : "no",
      gridType: gridType || "",
      gridPattern: gridPattern || "",
      exteriorColor: exteriorColor,
      interiorColor: interiorColor,
      hardware: hardware,
      price: totalPrice,
    })

    requestQuoteBtn.setAttribute("href", `${baseUrl}?${queryParams.toString()}`)

    // Scroll to result
    calculatorResult.scrollIntoView({ behavior: "smooth" })

    // Also send data to LeadPerfection when calculating cost
    // Create a hidden form to submit to LeadPerfection
    const hiddenLeadForm = document.createElement("form")
    hiddenLeadForm.style.display = "none"
    hiddenLeadForm.action = "https://th97.leadperfection.com/batch/addleads.asp"
    hiddenLeadForm.method = "POST"
    document.body.appendChild(hiddenLeadForm)

    // Add required fields
    appendHiddenField(hiddenLeadForm, "sender", "Replacement Window Costs")
    appendHiddenField(hiddenLeadForm, "srs_id", "1672")
    appendHiddenField(hiddenLeadForm, "productid", "WINDOWS")
    appendHiddenField(hiddenLeadForm, "proddescr", "Window Replacement")

    // Add user information
    const firstName = document.getElementById("lp-firstname").value
    const lastName = document.getElementById("lp-lastname").value
    const email = document.getElementById("lp-email").value
    const phone = document.getElementById("lp-phone1").value
    const zip = document.getElementById("lp-zip").value
    const city = document.getElementById("lp-city").value
    const state = document.getElementById("lp-state").value

    appendHiddenField(hiddenLeadForm, "firstname", firstName)
    appendHiddenField(hiddenLeadForm, "lastname", lastName)
    appendHiddenField(hiddenLeadForm, "email", email)
    appendHiddenField(hiddenLeadForm, "phone1", phone)
    appendHiddenField(hiddenLeadForm, "zip", zip)
    appendHiddenField(hiddenLeadForm, "city", city)
    appendHiddenField(hiddenLeadForm, "state", state)

    // Add notes with window details
    const notes = `
Window Estimate Details:
- Customer: ${firstName} ${lastName}
- Contact: ${email} / ${phone}
- Location: ${city}, ${state} ${zip}
- Window Count: ${windowCount}
- Window Type: ${windowType}
- Frame Material: ${frameMaterial}
- Window Size: ${windowSize}
- Screen Type: ${screenType}
- Grids/Muntins: ${hasGrids ? "Yes" : "No"}
${hasGrids ? `- Grid Type: ${gridType}` : ""}
${hasGrids ? `- Grid Pattern: ${gridPattern}` : ""}
- Exterior Color: ${exteriorColor}
- Interior Color: ${interiorColor}
- Hardware: ${hardware}
- Estimated Total Cost: $${totalPrice.toLocaleString()}
  `.trim()

    appendHiddenField(hiddenLeadForm, "notes", notes)

    // Submit the form silently in the background
    const hiddenIframe = document.createElement("iframe")
    hiddenIframe.name = "silent_submission"
    hiddenIframe.style.display = "none"
    document.body.appendChild(hiddenIframe)

    hiddenLeadForm.target = "silent_submission"
    hiddenLeadForm.submit()
  })

  // Helper function to populate LeadPerfection fields
  function populateLeadPerfectionFields() {
    // Get window details
    const windowType = document.getElementById("window-type").value
    const frameMaterial = document.getElementById("frame-material").value
    const windowSize = document.getElementById("window-size").value
    const screenType = document.getElementById("screen-type").value
    const hasGrids = document.querySelector('input[name="grids"]:checked').value === "yes"
    const windowCount = document.getElementById("window-count").value
    const totalPrice = document.getElementById("total-cost").textContent

    // Get color and hardware details
    const exteriorColor = document.querySelector('input[name="exterior-color"]:checked').value
    const interiorColor = document.querySelector('input[name="interior-color"]:checked').value
    const hardware = document.querySelector('input[name="hardware"]:checked').value

    // Set product ID and description
    document.getElementById("lp-productid").value = "WINDOWS"
    document.getElementById("lp-proddescr").value = "Window Replacement"

    // Get contact information from the main form
    const firstName = document.getElementById("lp-firstname").value
    const lastName = document.getElementById("lp-lastname").value
    const email = document.getElementById("lp-email").value
    const phone = document.getElementById("lp-phone1").value
    const zip = document.getElementById("lp-zip").value
    const city = document.getElementById("lp-city").value
    const state = document.getElementById("lp-state").value

    // Create detailed notes
    const notes = `
Window Estimate Details:
- Customer: ${firstName} ${lastName}
- Contact: ${email} / ${phone}
- Location: ${city}, ${state} ${zip}
- Window Count: ${windowCount}
- Window Type: ${windowType}
- Frame Material: ${frameMaterial}
- Window Size: ${windowSize}
- Screen Type: ${screenType}
- Grids/Muntins: ${hasGrids ? "Yes" : "No"}
- Exterior Color: ${exteriorColor}
- Interior Color: ${interiorColor}
- Hardware: ${hardware}
- Estimated Total Cost: ${totalPrice}
    `.trim()

    document.getElementById("lp-notes").value = notes

    // Add user information to the form
    const quickLeadForm = document.getElementById("quick-lead-form")
    appendHiddenField(quickLeadForm, "firstname", firstName)
    appendHiddenField(quickLeadForm, "lastname", lastName)
    appendHiddenField(quickLeadForm, "email", email)
    appendHiddenField(quickLeadForm, "phone1", phone)
    appendHiddenField(quickLeadForm, "zip", zip)
    appendHiddenField(quickLeadForm, "city", city)
    appendHiddenField(quickLeadForm, "state", state)
  }

  // Helper function to append hidden fields
  function appendHiddenField(form, name, value) {
    // Check if field already exists
    const existingField = form.querySelector(`input[name="${name}"]`)
    if (existingField && existingField.type === "hidden") {
      existingField.value = value
      return
    }

    const input = document.createElement("input")
    input.type = "hidden"
    input.name = name
    input.value = value
    form.appendChild(input)
  }
})

