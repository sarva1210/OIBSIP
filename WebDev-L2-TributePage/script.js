// DOM ELEMENTS

const homePage = document.getElementById("homePage");
const tributePage = document.getElementById("tributePage");
const personCards = document.querySelectorAll(".person-card");
const backButton = document.getElementById("backButton");

const tributeImage = document.getElementById("tributeImage");
const tributeSubtitle = document.getElementById("tributeSubtitle");
const tributeName = document.getElementById("tributeName");
const tributeAbout = document.getElementById("tributeAbout");
const tributeTimeline = document.getElementById("tributeTimeline");
const tributeAchievements = document.getElementById("tributeAchievements");
const tributeQuote = document.getElementById("tributeQuote");

// PEOPLE DATA

const people = {
    kalam: {
        name: "A. P. J. Abdul Kalam",
        subtitle: "Scientist, Visionary & Former President of India",
        image: "assets/apj-abdul-kalam.jpg",
        about: [
            "A. P. J. Abdul Kalam was an Indian aerospace scientist who was closely associated with India's space and defence programmes. He was born on 15 October 1931 in Rameswaram, Tamil Nadu, and developed an early interest in science and engineering.",
            "Kalam worked with organisations including the Indian Space Research Organisation and the Defence Research and Development Organisation. His work was connected with major Indian space and missile development programmes, and he became widely known as a scientist and public figure.",
            "In 2002, Kalam became the 11th President of India and served until 2007. During and after his presidency, he continued to interact with students and speak about education, scientific development, innovation, and India's future.",
            "Kalam wrote several books, including Wings of Fire and India 2020. He remained closely associated with education and students until his death in 2015 while delivering a lecture at IIM Shillong."
        ],
        timeline: [
            {
                year: "1931",
                text: "Born in Rameswaram, Tamil Nadu."
            },
            {
                year: "1960s",
                text: "Began important work in India's space and defence programmes."
            },
            {
                year: "1997",
                text: "Received the Bharat Ratna."
            },
            {
                year: "2002",
                text: "Became the 11th President of India."
            },
            {
                year: "2015",
                text: "Passed away while delivering a lecture to students."
            }
        ],
        achievements: [
            "Contributed to India's space and missile development programmes.",
            "Served as the 11th President of India.",
            "Received the Bharat Ratna in 1997.",
            "Authored books including Wings of Fire and India 2020."
        ],
        quote: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action."
    },

    vivekananda: {
        name: "Swami Vivekananda",
        subtitle: "Philosopher, Monk & Spiritual Leader",
        image: "assets/swami-vivekananda.jpg",
        about: [
            "Swami Vivekananda was an Indian monk and philosopher born as Narendranath Datta in Kolkata in 1863. He became a disciple of Sri Ramakrishna and developed a strong interest in spirituality, philosophy, education, and social service.",
            "He became internationally known after representing India at the World's Parliament of Religions in Chicago in 1893. His speeches introduced many international audiences to Indian philosophical traditions including Vedanta.",
            "After returning to India, Vivekananda continued to speak about education, self-confidence, service, and the development of society. He believed that education should help people develop their character and abilities.",
            "In 1897, he founded the Ramakrishna Mission, an organisation involved in educational, social, and humanitarian activities. Swami Vivekananda passed away in 1902 at Belur Math."
        ],
        timeline: [
            {
                year: "1863",
                text: "Born in Kolkata as Narendranath Datta."
            },
            {
                year: "1881",
                text: "Met Sri Ramakrishna, who became his spiritual teacher."
            },
            {
                year: "1893",
                text: "Addressed the World's Parliament of Religions in Chicago."
            },
            {
                year: "1897",
                text: "Founded the Ramakrishna Mission."
            },
            {
                year: "1902",
                text: "Passed away at Belur Math."
            }
        ],
        achievements: [
            "Represented India at the World's Parliament of Religions.",
            "Helped introduce Vedanta and Indian philosophy to international audiences.",
            "Founded the Ramakrishna Mission.",
            "Delivered teachings focused on education, service, and self-development."
        ],
        quote: "Arise, awake, and do not stop until the goal is reached."
    },

    tata: {
        name: "Ratan Tata",
        subtitle: "Industrialist, Philanthropist & Former Tata Sons Chairman",
        image: "assets/ratan-tata.jpg",
        about: [
            "Ratan Naval Tata was an Indian industrialist and philanthropist who was born in Mumbai in 1937. He joined the Tata Group in 1962 after completing his studies and gradually took on leadership responsibilities within the group.",
            "In 1991, Tata became Chairman of Tata Sons. During his tenure, Tata Group companies expanded their presence internationally, including through acquisitions involving companies such as Jaguar Land Rover and Tetley.",
            "Beyond business, Tata was associated with philanthropic initiatives in areas such as education, healthcare, research, and rural development through Tata charitable institutions. He also supported several educational and scientific institutions.",
            "Ratan Tata retired as Chairman of Tata Sons in 2012 and later served as Chairman Emeritus. He received several honours during his lifetime, including the Padma Vibhushan in 2008. He passed away in Mumbai in 2024."
        ],
        timeline: [
            {
                year: "1937",
                text: "Born in Mumbai, India."
            },
            {
                year: "1962",
                text: "Joined the Tata Group."
            },
            {
                year: "1991",
                text: "Became Chairman of Tata Sons."
            },
            {
                year: "2008",
                text: "Received the Padma Vibhushan."
            },
            {
                year: "2024",
                text: "Passed away in Mumbai."
            }
        ],
        achievements: [
            "Led Tata Sons from 1991 to 2012.",
            "Oversaw major international expansion of Tata Group companies.",
            "Received the Padma Vibhushan in 2008.",
            "Supported education, healthcare, research, and philanthropic initiatives."
        ],
        quote: "I don't believe in taking right decisions. I take decisions and then make them right."
    },

    ambedkar: {
        name: "Dr. B. R. Ambedkar",
        subtitle: "Jurist, Economist, Scholar & Social Reformer",
        image: "assets/br-ambedkar.webp",
        about: [
            "Dr. Bhimrao Ramji Ambedkar was an Indian jurist, economist, scholar, and social reformer. He was born on 14 April 1891 in Mhow, in present-day Madhya Pradesh, and pursued higher education in India and abroad.",
            "Ambedkar became an important voice in discussions about social equality, education, political representation, and the rights of historically marginalised communities. He used his education and legal knowledge to advocate for social and economic rights.",
            "After India became independent, Ambedkar served as the country's first Law and Justice Minister. He also served as Chairman of the Constitution Drafting Committee and played a major role in the preparation of the Constitution of India.",
            "Ambedkar continued writing and working on questions of social justice and equality throughout his life. He died in 1956 and was awarded the Bharat Ratna posthumously in 1990."
        ],
        timeline: [
            {
                year: "1891",
                text: "Born in Mhow, present-day Madhya Pradesh."
            },
            {
                year: "1923",
                text: "Completed advanced studies in economics and law."
            },
            {
                year: "1947",
                text: "Became India's first Law and Justice Minister."
            },
            {
                year: "1948",
                text: "Presented the Draft Constitution to the Constituent Assembly."
            },
            {
                year: "1956",
                text: "Passed away in Delhi."
            },
            {
                year: "1990",
                text: "Received the Bharat Ratna posthumously."
            }
        ],
        achievements: [
            "Played a leading role in drafting the Constitution of India.",
            "Served as India's first Law and Justice Minister.",
            "Advocated education, equality, and social justice.",
            "Received the Bharat Ratna posthumously in 1990."
        ],
        quote: "Cultivation of mind should be the ultimate aim of human existence."
    }
};

// OPEN TRIBUTE

function openTribute(personId) {
    const person = people[personId];

    if (!person) {
        return;
    }

    tributeImage.src = person.image;
    tributeImage.alt = person.name;
    tributeSubtitle.textContent = person.subtitle;
    tributeName.textContent = person.name;
    tributeQuote.textContent = `"${person.quote}"`;

    tributeAbout.innerHTML = "";

    person.about.forEach(function (paragraph) {
        const paragraphElement = document.createElement("p");

        paragraphElement.textContent = paragraph;

        tributeAbout.appendChild(paragraphElement);
    });

    tributeTimeline.innerHTML = "";

    person.timeline.forEach(function (item) {
        const timelineItem = document.createElement("div");
        const year = document.createElement("p");
        const text = document.createElement("p");

        timelineItem.classList.add("timeline-item");
        year.classList.add("timeline-year");
        text.classList.add("timeline-text");

        year.textContent = item.year;
        text.textContent = item.text;

        timelineItem.appendChild(year);
        timelineItem.appendChild(text);

        tributeTimeline.appendChild(timelineItem);
    });

    tributeAchievements.innerHTML = "";

    person.achievements.forEach(function (achievement) {
        const listItem = document.createElement("li");

        listItem.textContent = achievement;

        tributeAchievements.appendChild(listItem);
    });

    homePage.classList.add("hidden");
    tributePage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// CARD CLICK EVENTS

personCards.forEach(function (card) {
    card.addEventListener("click", function () {
        const personId = card.dataset.person;

        openTribute(personId);
    });
});

// BACK BUTTON

backButton.addEventListener("click", function () {
    tributePage.classList.add("hidden");
    homePage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});