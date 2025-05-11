const today = new Date();
const minDate = new Date(
    today.getFullYear() - 55,
    today.getMonth(),
    today.getDate()
);
const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
);

document.getElementById("dob").min = minDate.toISOString().split("T")[0];
document.getElementById("dob").max = maxDate.toISOString().split("T")[0];

let userForm = document.getElementById("user_form");
let userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];

let errors = [];
const retieveEntries = () => {
    let entries = localStorage.getItem("userEntries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};
const displayEntries = () => {
    let entries = retieveEntries();
    const tbleEntries = entries
        .map((entry) => {
            return `
            <tr>
                <td class='border px-4 py-2'>${entry.FullName}</td>
                <td class='border px-4 py-2'>${entry.email}</td>
                <td class='border px-4 py-2'>${entry.password}</td>
                <td class='border px-4 py-2'>${entry.dob}</td>
                <td class='border px-4 py-2'>${entry.acceptTerms}</td>
            </tr>
        `;
        }).join('');
    const table = ` 
        <table class='table-auto w-full'>
            <tr>
                <th class='px-4 py-2 '>Name </th>
                <th class='px-4 py-2 '>Email </th>
                <th class='px-4 py-2 '>Password </th>
                <th class='px-4 py-2 '>Dob </th>
                <th class='px-4 py-2 '>Accepted terms? </th>
            </tr>${tbleEntries}
        </table>
    `;

    document.getElementById("user-entries").innerHTML = table;
};

const validateDOB = (dob) => {
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    return (
        age > 17 &&
        age < 56 &&
        (monthDiff > 0 ||
            (monthDiff === 0 && today.getDate() >= birthDate.getDate()))
    );
};

const saveUserForm = (event) => {
    event.preventDefault();

    const FullName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    if (!validateDOB(dob)) {
        document.getElementById("dob").style.border = "1px solid red";
        return alert("Age must be between 18 and 55");
    } else {
        document.getElementById("dob").style.border = "none";
    }
    const entry = { FullName, email, password, dob, acceptTerms };
    userEntries.push(entry);
    localStorage.setItem("userEntries", JSON.stringify(userEntries));
    displayEntries();
    userForm.reset();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
