function load() {
    const form = document.querySelector("form");
    const inputs = [...window.inputs.querySelectorAll("input")];
    const { day, month, year } = window;
    const date = new Date();
    year.max = date.getFullYear();
    let currentYear = date.getFullYear();
    year.addEventListener("input", (event) => { currentYear = event.target.value; updateMaxDay(); validateInPast(); });

    let currentMonth = 0;
    month.addEventListener("input", (event) => { currentMonth = event.target.value; updateMaxDay(); validateInPast(); });
    function updateMaxDay() {
        day.max = (new Date(Number(currentYear), Number(currentMonth), 0)).getDate();
    };
    let currentDay = 0;
    day.addEventListener("input", (event) => { currentDay = event.target.value; validateInPast(); });
    function validateInPast() {
        const inPast = (new Date(Number(currentYear), Number(currentMonth), Number(currentDay))) < date;
        const inputsFilled = inputs.every((input) => input.value != "");
        window.inputs.setAttribute("invalid", inputsFilled && !inPast);
        window.calculate.setAttribute("disabled", inputsFilled && !inPast);

    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const difference = date - (new Date(Number(currentYear), Number(currentMonth), Number(currentDay)));
        const [years, months, days] = [...(window.results.querySelectorAll(".output"))];
        const millisecondsInYear = 1000*60*60*24*365.2406;
        const millisecondsInMonth = 1000*60*60*24*30;
        const millisecondsInDay = 1000*60*60*24;
        const yearDifference = Math.floor(difference/millisecondsInYear);
        const monthDifference = Math.floor((difference - yearDifference*millisecondsInYear)/millisecondsInMonth);
        const dayDifference = Math.floor((difference - yearDifference*millisecondsInYear - monthDifference*millisecondsInMonth)/millisecondsInDay);

        years.innerText = yearDifference;
        months.innerText = monthDifference;
        days.innerText = dayDifference;

    });




    /* inputs.forEach((input) => {
        input.addEventListener("blur", () => {
            form.checkValidity();
        });
    }); */
}