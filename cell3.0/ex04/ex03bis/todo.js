// เมื่อหน้าเว็บโหลดเสร็จแล้ว (ทำงานเมื่อ DOM พร้อม)
$(document).ready(function () {
    const tasks = getTasksFromCookie(); // ดึง tasks จาก cookie
    tasks.forEach(task => displayTask(task)); // แสดงทุก task ในหน้า
});

// ฟังก์ชันแสดง task ในหน้า
function displayTask(task) {
    // สร้าง div ใหม่ และใส่ข้อความของ task
    const $taskDiv = $("<div></div>").addClass("task").text(task);

    // เมื่อคลิกที่ task ถามว่าจะลบไหม
    $taskDiv.on("click", function () {
        if (confirm("Do you want to remove this task?")) {
            $(this).remove(); // ลบจากหน้าเว็บ
            removeTaskFromCookie(task); // ลบจาก cookie ด้วย
        }
    });

    // เพิ่ม task นี้ไว้ด้านบนสุดของรายการ
    $("#ft_list").prepend($taskDiv);
}

// ฟังก์ชันเพิ่ม task ใหม่
function addTask() {
    const task = prompt("Enter a new task:"); // แสดงกล่องให้พิมพ์ task
    if (task && task.trim() !== "") {
        displayTask(task);        // แสดง task บนหน้าเว็บ
        saveTaskToCookie(task);   // บันทึก task ลง cookie
    }
}

// บันทึก task ลง cookie
function saveTaskToCookie(task) {
    const tasks = getTasksFromCookie(); // ดึง tasks เก่า
    tasks.push(task);                   // เพิ่ม task ใหม่
    // แปลงเป็น JSON แล้วเก็บใน cookie ชื่อ "tasks"
    document.cookie = "tasks=" + JSON.stringify(tasks) + "; path=/";
}

// ดึง tasks จาก cookie
function getTasksFromCookie() {
    const cookies = document.cookie.split("; "); // แยก cookie หลายตัว
    const tasksCookie = cookies.find(c => c.startsWith("tasks=")); // หา cookie ชื่อ tasks
    if (tasksCookie) {
        // ตัดเอาค่าออกมา แล้วแปลงจาก JSON เป็น array
        return JSON.parse(tasksCookie.split("=")[1]);
    }
    return []; // ถ้าไม่มี cookie นี้เลย ให้คืน array ว่าง
}

// ลบ task ออกจาก cookie
function removeTaskFromCookie(task) {
    let tasks = getTasksFromCookie(); // ดึงรายการ task
    tasks = tasks.filter(t => t !== task); // เอา task ที่คลิกออก
    // บันทึก task ที่เหลือกลับไปใน cookie
    document.cookie = "tasks=" + JSON.stringify(tasks) + "; path=/";
}