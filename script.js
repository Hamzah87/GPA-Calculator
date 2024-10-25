document.getElementById('addRowBtn').addEventListener('click', function() {
    const tableBody = document.getElementById('tableBody');
    const rowCount = tableBody.rows.length + 1;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="checkbox" checked></td>
        <td>Course #${rowCount}</td>
        <td>
            <select class="grade">
                <option value="">--</option>
                <option value="4.0">A</option>
                <option value="3.7">A−</option>
                <option value="3.3">B+</option>
                <option value="3.0">B</option>
                <option value="2.7">B−</option>
                <option value="2.3">C+</option>
                <option value="2.0">C</option>
                <option value="1.7">C−</option>
                <option value="1.3">D+</option>
                <option value="1.0">D</option>
                <option value="0.7">D−</option>
                <option value="0.0">F</option>
            </select>
        </td>
        <td><input type="number" class="credits" placeholder="Credits"></td>
        <td><button class="delete-row">X</button></td>
    `;
    tableBody.appendChild(row);
    addDeleteRowEvent();
});

function addDeleteRowEvent() {
    const deleteButtons = document.querySelectorAll('.delete-row');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            button.closest('tr').remove();
        });
    });
}
addDeleteRowEvent();

document.getElementById('calculateGpa').addEventListener('click', function() {
    const rows = document.querySelectorAll('#tableBody tr');
    let totalCredits = 0;
    let totalGradePoints = 0;

    rows.forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        const grade = row.querySelector('.grade').value;
        const credits = row.querySelector('.credits').value;

        if (checkbox.checked && grade && credits) {
            totalCredits += parseFloat(credits);
            totalGradePoints += parseFloat(grade) * parseFloat(credits);
        }
    });

    const gpa = (totalGradePoints / totalCredits).toFixed(2);
    document.getElementById('gpa').value = isNaN(gpa) ? '0.00' : gpa;
});

/* Updated Reset Functionality */
document.getElementById('resetForm').addEventListener('click', function() {
    const tableBody = document.getElementById('tableBody');

    // Clear all rows
    tableBody.innerHTML = '';

    // Add a fresh empty row
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="checkbox" checked></td>
        <td>Course #1</td>
        <td>
            <select class="grade">
                <option value="">--</option>
                <option value="4.0">A</option>
                <option value="3.7">A−</option>
                <option value="3.3">B+</option>
                <option value="3.0">B</option>
                <option value="2.7">B−</option>
                <option value="2.3">C+</option>
                <option value="2.0">C</option>
                <option value="1.7">C−</option>
                <option value="1.3">D+</option>
                <option value="1.0">D</option>
                <option value="0.7">D−</option>
                <option value="0.0">F</option>
            </select>
        </td>
        <td><input type="number" class="credits" placeholder="Credits"></td>
        <td><button class="delete-row">X</button></td>
    `;
    tableBody.appendChild(newRow);

    // Reapply delete row functionality to the new row
    addDeleteRowEvent();
});
