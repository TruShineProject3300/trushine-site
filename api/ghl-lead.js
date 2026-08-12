// FILE: api/ghl-lead.js
// Creates a contact in GHL directly via the REST API
// API key read from Vercel environment variable GHL_API_KEY
// The browser NEVER sees the key

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.GHL_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "GHL API key not configured" });

  try {
    const lead = req.body;

    const contactData = {
      firstName: lead.first_name || "",
      lastName: lead.last_name || "",
      phone: lead.phone || "",
      email: lead.email || "",
      companyName: lead.organization || "",
      city: lead.city || "",
      source: lead.source || "Shine Chatbot",
      tags: ["shine-lead"],
      customFields: []
    };

    // Add service_needed as a custom field or in notes
    if (lead.service_needed) {
      contactData.customFields.push({
        key: "service_needed",
        field_value: lead.service_needed
      });
    }

    // Add notes
    if (lead.notes || lead.service_needed || lead.page_url) {
      contactData.customFields.push({
        key: "notes",
        field_value: [
          lead.notes || "",
          lead.service_needed ? "Service: " + lead.service_needed : "",
          lead.page_url ? "Page: " + lead.page_url : ""
        ].filter(Boolean).join(" | ")
      });
    }

    const response = await fetch("https://services.leadconnectorhq.com/contacts/", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json",
        "Version": "2021-07-28"
      },
      body: JSON.stringify(contactData)
    });

    const data = await response.json();

    if (response.ok) {
      console.log("GHL contact created:", data.contact?.id);
      return res.status(200).json({ success: true, contactId: data.contact?.id });
    } else {
      console.error("GHL API error:", data);
      return res.status(response.status).json({ error: data.message || "GHL API error", details: data });
    }
  } catch (error) {
    console.error("GHL lead creation error:", error);
    return res.status(500).json({ error: "Failed to create contact" });
  }
}
