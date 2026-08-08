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
  { author: "Yusivel Hernández", rating: 5, text: "They did a great job with my car, thank you guys mar car it’s new again" },
  { author: "cesar de la paz nieto", rating: 5, text: "Thank you for your time and effort in making my car look like new. Thank you so much!" },
  { author: "Marlenis Valdés", rating: 5, text: "The best service I've ever received, 100% recommended. Try it and see for yourself. Thank you." },
  { author: "Maria Valdes", rating: 5, text: "They are best option for detail your cars, I’m fall in love with my car again" },
  { author: "Trevor Snyder", rating: 5, text: "Did a great job detailing my vehicle" },
  { author: "Lorena Echevarria", rating: 5, text: "Excellent service" },
  { author: "Leonardo Diaz", rating: 5, text: "Excellent service, I highly recommend them, they made my car look brand new." },
  { author: "Elsa Diaz", rating: 5, text: "My car si new again. Thanks very much" },
  { author: "Michael DelTorro", rating: 5, text: "Looks like brand new!" },
  { author: "Randy Adan", rating: 5, text: "Excellent and reliable service, I recommend it to my friends." },
  { author: "Janier Espinosa", rating: 5, text: "My people, if you want your car to look like new, I recommend ApexDetailing." },
  { author: "Frank Torres", rating: 5, text: "They make a great job very good quality" },
  { author: "El duro", rating: 5, text: "The best in detailing" },
  { author: "Edely Ferrer", rating: 5, text: "They let My car better than the dealer" },
  { author: "T U R K Griffin", rating: 5, text: "Very easy to connect very detailed just all around great service" },
  { author: "Tomas Gonzalez", rating: 5, text: "💯 recommended, fast and professional did it great job with my car and pricing is great" },
  { author: "dagoberto rodriguez", rating: 5, text: "Great work , great customer service, great prices. Good quality" },
  { author: "Vance Schaeffer", rating: 5, text: "Great service" },
  { author: "Diego Amador", rating: 5, text: "He did a great job on detailing my car" },
  { author: "Saday Perez", rating: 5, text: "The best without a doubt, I loved the result" },
  { author: "Justo Martinez", rating: 5, text: "Excellent work, I've never seen my car so clean. Thank you for the exceptional service, highly recommended." },
  { author: "Barbara Cortez", rating: 5, text: "Excellent service!! Highly recommended" },
  { author: "PACHENKO HTX", rating: 5, text: "Very professional and hard worker guy. Left my truck like a brand new vehicle. Highly recommended for vehicles detailing." },
  { author: "Marialis Frometa", rating: 5, text: "Excellent service, highly recommended. Great customer service and great results." },
  { author: "Aniel Sori", rating: 5, text: "If you want your car clean and to have that like-new shine restored, this is the place to come. I highly recommend it. The dashboard on my car looks just like it did when I bought it!" },
  { author: "Eddy Díaz Vega", rating: 5, text: "Good service 💪🏻 the best" },
  { author: "Gian Pacheco", rating: 5, text: "I was very satisfied with the work. They took care of every detail, and my car looks brand new. The service was excellent and very fast. Highly recommended." },
  { author: "Laritza Gonzalez", rating: 5, text: "The best excellent service" },
  { author: "Katyleidy Laurencio", rating: 5, text: "Great, very good work" },
  { author: "Siomara Fonrodona", rating: 5, text: "The best car wash in years! I was really looking forward to an interior cleaning that would make my car look brand new, and I got it!" },
  { author: "Malena De Varona", rating: 5, text: "The best service!!! 100 % recommend!!!" },
  { author: "Lisandra Marichal", rating: 5, text: "I Love it Amazing And Great job. Thanks" },
  { author: "Mery González", rating: 5, text: "Excellent service! I highly recommend it. Your car will look brand new, super clean, and smell amazing." },
  { author: "Modesto Rodriguez", rating: 5, text: "The best of the best, 100% recommended" },
  { author: "Julio Rodriguez", rating: 5, text: "Excellent" },
  { author: "Leosvel Diaz", rating: 5, text: "They did a amazing job with my car. Brand new" },
  { author: "Alberto", rating: 5, text: "Great service I would definitely book again" },
  { author: "Ernesto Morales", rating: 5, text: "Amazing job!!" },
  { author: "Aliesh Montalvo", rating: 5, text: "I love how my car looks and smells now like new, will definitely be booking again, best service I have received, very professional and detailed on services" },
  { author: "Sheila Fonrodona", rating: 5, text: "Excellent service, my car looks brand new! 100% recommended" },
  { author: "Naivy posada", rating: 5, text: "If you want to make your cars look brand new, this is the place. Excellent! They speak English and Spanish. Efficiency and quality." },
  { author: "Kleiner Leon", rating: 5, text: "The best detailer—you made my car look brand new. Thanks!" },
  { author: "Diego Acevedo", rating: 5, text: "It was a great service I loved the attention and the car came as new as if it was from the dealer" },
  { author: "Niurky Valdés", rating: 5, text: "His work is exquisite, I highly recommend him; his dedication is admirable." },
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
