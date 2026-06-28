export async function getCourses() {
    // In the browser we can fetch from the same origin.
    if (typeof window !== "undefined") {
        const res = await fetch("/data.json", { cache: "no-store" });
        if (!res.ok) {
            throw new Error("Failed to fetch courses");
        }
        return res.json();
    }

    // On the server (SSR/RSC), read from the local `public/data.json`.
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const filePath = path.join(process.cwd(), "public", "data.json");
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);

}
export async function getCourseDetaisById(id) {
    const courses = await getCourses()

    const course = courses.find(
        (course) => course.id.toString() === id.toString())

    return course
}

export async function getTopCourses() {
    const courses = await getCourses()
    return courses.filter((course) => course.rating === 5.0)
}

export async function getTrendingCourses() {
    const courses = await getCourses()
    return courses.filter((course) => course.level === "Advanced")
}



