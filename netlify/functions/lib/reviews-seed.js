var SEED_REVIEWS = [
  { author: "José de Lima", rating: 5, text: "The best" },
  { author: "Super Freak", rating: 5, text: "Excellent Service, Left My Car Very Clean And Didn\u2019t See Any Dust" },
  { author: "Margarita Patiño", rating: 5, text: "Thanks to their wonderful services, I recommend them 100%. My car is like new." },
  { author: "Jenniffer Leon", rating: 5, text: "They let my car shine, it\u2019s brand new again I recommend them 100%" },
  { author: "Shehryar Nadeem", rating: 5, text: "I had an excellent experience with Apex Detailing. They did an outstanding job detailing both the interior and exterior of my car, and the results were amazing. My car looks and feels brand new again!" },
  { author: "Rodolfo Perez", rating: 5, text: "Excellent work, I recommend them if you want your car brand new again" },
  { author: "Gage Shafley", rating: 5, text: "Detailed my car I was trying to sell. Great work, was cleaner than the day I bought it!" },
  { author: "Dayanis Garcia", rating: 5, text: "Great service I would definetly book again" },
  { author: "Devin Foster", rating: 5, text: "The Best Detailer in the City!" },
  { author: "Brandon Bookman", rating: 5, text: "My experience with Apex Detailing was amazing. They left my car in very good condition. They were very professional and fast with their work. I would recommend working with them 10 out of 10 times." },
  { author: "Ivan Fonseca", rating: 5, text: "100% recommended will leave your vehicle spot clean!!" },
  { author: "Tatiana Granda", rating: 5, text: "Excellent work. The care and dedication are evident in every detail. Very professional, friendly, and with impeccable results. I definitely recommend him." },
];

function staticReviewRecords() {
  return SEED_REVIEWS.map(function (r, i) {
    return {
      id: "static-review-" + (i + 1),
      nombre: r.author,
      comentario: r.text,
      calificacion: r.rating,
      foto: null,
      estado: "aprobada",
      fecha: new Date(2026, 0, 1, 0, 0, i).toISOString(),
      static: true,
    };
  });
}

// Self-healing: checks each expected static review directly by key (strongly
// consistent) and (re)writes any that are missing. Does not rely on list().
async function ensureReviewsSeeded(store) {
  var expected = staticReviewRecords();
  var result = [];
  for (var i = 0; i < expected.length; i++) {
    var rec = expected[i];
    var existing = await store.get(rec.id, { type: "json" }).catch(function () { return null; });
    if (!existing) {
      await store.setJSON(rec.id, rec);
      result.push(rec);
    } else {
      result.push(existing);
    }
  }
  return result;
}

module.exports = { ensureReviewsSeeded: ensureReviewsSeeded, staticReviewRecords: staticReviewRecords };
