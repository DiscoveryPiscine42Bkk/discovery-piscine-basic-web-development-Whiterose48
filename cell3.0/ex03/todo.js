// ฟังก์ชันแสดง task ในรายการ
function displayTask(task) {
    const taskList = document.getElementById("ft_list");

    // สร้าง div ใหม่สำหรับ task
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.textContent = task;

    // เพิ่ม event ให้ task เมื่อคลิก
    taskDiv.onclick = function () {
        if (confirm("Do you want to remove this task?")) {
            taskDiv.remove(); // ลบ task จากหน้า
            removeTaskFromCookie(task); // ลบ task จาก cookie
        }
    };

    // เพิ่ม task ไปที่ด้านบนสุดของรายการ
    taskList.insertBefore(taskDiv, taskList.firstChild);
}

// ฟังก์ชันเพิ่ม task ใหม่
function addTask() {
    const task = prompt("Enter a new task:");
    if (task && task.trim() !== "") {
        displayTask(task); // แสดง task ในหน้า
        saveTaskToCookie(task); // บันทึก task ลงใน cookie
    }
}

// ฟังก์ชันบันทึก task ลงใน cookie
function saveTaskToCookie(task) {
    let tasks = getTasksFromCookie(); // ดึงรายการ tasks จาก cookie
    tasks.push(task); // เพิ่ม task ใหม่ไปที่รายการ
    document.cookie = "tasks=" + JSON.stringify(tasks) + "; path=/"; // บันทึกรายการลงใน cookie
}

// ฟังก์ชันดึง tasks จาก cookie
function getTasksFromCookie() {
    const cookies = document.cookie.split("; "); // แยกคุกกี้ทั้งหมด
    const tasksCookie = cookies.find(cookie => cookie.startsWith("tasks=")); // ค้นหาคุกกี้ที่ชื่อ "tasks="
    if (tasksCookie) {
        return JSON.parse(tasksCookie.split("=")[1]); // ถ้ามีคุกกี้ tasks ให้แปลงเป็น JSON และคืนค่า
    }
    return [];
}

// ฟังก์ชันลบ task จาก cookie
function removeTaskFromCookie(task) {
    let tasks = getTasksFromCookie(); // ดึงรายการ tasks จาก cookie
    tasks = tasks.filter(t => t !== task); // ลบ task ที่ต้องการออกจากรายการ
    document.cookie = "tasks=" + JSON.stringify(tasks) + "; path=/"; // บันทึกรายการ tasks ที่อัปเดตใน cookie
}

// โหลด tasks จาก cookie เมื่อหน้าเว็บถูกโหลด
window.onload = function () {
    let tasks = getTasksFromCookie();
    tasks.forEach(task => displayTask(task));
}