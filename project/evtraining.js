const evData = {
    HP: "Increases survivability",
    Attack: "Boosts physical damage",
    Defense: "Reduces physical damage taken",
    SpAttack: "Boosts special attack damage",
    SpDefense: "Reduces special damage taken",
    Speed: "Determines turn order"
};

/* POKEMON ROLE ADVICE */
const roleAdvice = {
    physical: {
        title: "Physical Attacker",
        stats: ["Attack", "Speed"],
        description:
            "Physical attackers rely on high Attack and Speed to hit first and hit hard.",
        tips: [
            "Invest 252 EVs in Attack",
            "Invest 252 EVs in Speed",
            "Use Nature that boosts Attack or Speed",
            "Look for high Attack base stat Pokémon"
        ]
    },

    special: {
        title: "Special Attacker",
        stats: ["Special Attack", "Speed"],
        description:
            "Special attackers use special moves and benefit from Speed control.",
        tips: [
            "Invest 252 EVs in Special Attack",
            "Invest 252 EVs in Speed",
            "Look for high Special Attack base stat Pokémon",
            "Consider moves with high base power or coverage"
        ]
    },

    wall: {
        title: "Defensive Wall",
        stats: ["HP", "Defense"],
        description:
            "Physical walls absorb physical hits and outlast opponents.",
        tips: [
            "Invest 252 EVs in HP",
            "Invest 252 EVs in Defense",
            "Look for high HP and Defense base stats",
            "Use recovery or sustain moves"
        ]
    },

    spwall: {
        title: "Special Defensive Wall",
        stats: ["HP", "Special Defense"],
        description:
            "Special walls handle special attackers and sustain long battles.",
        tips: [
            "Invest 252 EVs in HP",
            "Invest 252 EVs in Special Defense",
            "Look for high HP and Special Defense stats",
            "Use status or healing support moves"
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#roleForm");
    const output = document.querySelector("#roleOutput");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const role = document.querySelector("#roleSelect").value;

            if (!role) {
                output.textContent = "Please select a role first.";
                return;
            }

            const data = roleAdvice[role];

            output.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.description}</p>

        <p><strong>Recommended EV Investment:</strong></p>
        <ul>
          ${data.stats.map(stat => `<li>${stat}</li>`).join("")}
        </ul>

        <p><strong>Tips for choosing a Pokémon:</strong></p>
        <ul>
          ${data.tips.map(tip => `<li>${tip}</li>`).join("")}
        </ul>
      `;

            localStorage.setItem("lastRole", role);
        });

        const saved = localStorage.getItem("lastRole");
        if (saved) {
            document.querySelector("#roleSelect").value = saved;
        }
    }
});

/* --- EV STAT CALCULATION (simplified Pokémon formula) --- */
/* We use a simplified model:
   Final Stat = Base + (EV / 4)
*/

function calcStat(base, ev) {
    return Math.floor(base + (ev / 4));
}

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.querySelector("#calcBtn");

    if (!btn) return;

    btn.addEventListener("click", () => {

        const base = {
            hp: Number(document.querySelector("#baseHP").value),
            atk: Number(document.querySelector("#baseATK").value),
            def: Number(document.querySelector("#baseDEF").value),
            spa: Number(document.querySelector("#baseSPA").value),
            spd: Number(document.querySelector("#baseSPD").value),
            spe: Number(document.querySelector("#baseSPE").value)
        };

        const ev = {
            hp: Number(document.querySelector("#evHP").value),
            atk: Number(document.querySelector("#evATK").value),
            def: Number(document.querySelector("#evDEF").value),
            spa: Number(document.querySelector("#evSPA").value),
            spd: Number(document.querySelector("#evSPD").value),
            spe: Number(document.querySelector("#evSPE").value)
        };

        const totalEV =
            ev.hp + ev.atk + ev.def + ev.spa + ev.spd + ev.spe;

        const evTotalDisplay = document.querySelector("#evTotal");
        const warning = document.querySelector("#warning");

        evTotalDisplay.textContent = `Total EVs: ${totalEV} / 510`;

        if (totalEV > 510) {
            warning.textContent = "⚠ EV limit exceeded! Max is 510.";
        } else if (totalEV === 510) {
            warning.textContent = "✅ Perfect EV spread!";
        } else {
            warning.textContent = `You have ${510 - totalEV} EVs remaining.`;
        }

        const finalStats = {
            HP: calcStat(base.hp, ev.hp),
            Attack: calcStat(base.atk, ev.atk),
            Defense: calcStat(base.def, ev.def),
            "Special Attack": calcStat(base.spa, ev.spa),
            "Special Defense": calcStat(base.spd, ev.spd),
            Speed: calcStat(base.spe, ev.spe)
        };

        const results = document.querySelector("#results");

        results.innerHTML = `
      <p><strong>HP:</strong> ${finalStats.HP}</p>
      <p><strong>Attack:</strong> ${finalStats.Attack}</p>
      <p><strong>Defense:</strong> ${finalStats.Defense}</p>
      <p><strong>Special Attack:</strong> ${finalStats["Special Attack"]}</p>
      <p><strong>Special Defense:</strong> ${finalStats["Special Defense"]}</p>
      <p><strong>Speed:</strong> ${finalStats.Speed}</p>
    `;

        localStorage.setItem("evSim", JSON.stringify({ base, ev }));
    });

    const saved = JSON.parse(localStorage.getItem("evSim"));

    if (saved) {
        document.querySelector("#baseHP").value = saved.base.hp;
        document.querySelector("#baseATK").value = saved.base.atk;
        document.querySelector("#baseDEF").value = saved.base.def;
        document.querySelector("#baseSPA").value = saved.base.spa;
        document.querySelector("#baseSPD").value = saved.base.spd;
        document.querySelector("#baseSPE").value = saved.base.spe;

        document.querySelector("#evHP").value = saved.ev.hp;
        document.querySelector("#evATK").value = saved.ev.atk;
        document.querySelector("#evDEF").value = saved.ev.def;
        document.querySelector("#evSPA").value = saved.ev.spa;
        document.querySelector("#evSPD").value = saved.ev.spd;
        document.querySelector("#evSPE").value = saved.ev.spe;
    }
});