// ==========================================
// 4. CATCH-ALL ROUTE FOR HARD REFRESHES
// ==========================================
app.get("*", (req, res) => {
  // Use relative path routing to look for the bundled assets directory
  const fallbackIndexHtml = join(__dirname, "..", "..", "dist", "client", "index.html");
  
  res.sendFile(fallbackIndexHtml, (err) => {
    if (err) {
      // Prevents the server process from fully crashing (500), safely returning a clean fallback instead
      console.error("Static file delivery failed:", err);
      res.status(404).send("Page path could not be resolved by server.");
    }
  });
});

// 5. EXPORT FOR VERCEL
export default app;
