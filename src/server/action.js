'use server'

import { query } from './db'
import { checkSession } from './session'

export const fetchTraineePrograms = async (joined) => {
    const res = await checkSession()
    if (res.error != "none" || res.user_data.classification != "trainee") return { error: "session-invalid" }

    const query_str = `SELECT pv.program_id, pv.name, pv.description, pv.date_created, pv.number_of_trainees, pv.number_of_trainors
                        FROM program_view pv
                        LEFT JOIN program_users pu ON pv.program_id = pu.program_id
                        WHERE ${joined ? `pu.account_id = ${res.user_data.account_id}` : "pu.program_id is NULL"};`

    try {
        const res = await query(query_str)
        return { error: "none", programs: res }
    }
    catch (err) {
        console.log("fetching programs failed: ", err)
        return { error: "fetching-programs-failed" }
    }
}

export const fetchTraineeLessons = async (program_id) => {
    const res = await checkSession()
    if (res.error != "none" || res.user_data.classification != "trainee") return { error: "session-invalid" }

    const query_program = `select * from program_view where program_id = ${program_id};`
    const query_lessons = `select * from lesson where program_id = ${program_id} order by lesson_id asc;`
    const query_finished_lessons = `select count(*) as total from (lesson as l right join lesson_log as ll 
                                on l.lesson_id = ll.lesson_id) where program_id = ${program_id};`
    const query_claimed = `select * from certificate_log where program_id = ${program_id} and account_id = ${res.user_data.account_id}`
    try {
        const res_lessons = await query(query_lessons)
        const res_finished_lessons = await query(query_finished_lessons)
        const res_claimed = await query(query_claimed)
        const res_program = await query(query_program) // BAD BAD BAD BAD

        return { error: "none", program: res_program[0], lessons: res_lessons, finished: res_finished_lessons, claimed: res_claimed }
    }
    catch (err) {
        console.log("fetching lessons failed: ", err)
        return { error: "fetching-lessons-failed" }
    }
}

export const fetchTraineeLessonMaterials = async (lesson_id) => {
    const res = await checkSession()
    if (res.error != "none" || res.user_data.classification != "trainee") return { error: "session-invalid" }

    const query_str = `select * from lesson_material where lesson_id = ${lesson_id} order by priority asc;`
    const query_lesson = `select * from lesson where lesson_id = ${lesson_id};`

    try {
        const res = await query(query_str)
        const res_lesson = await query(query_lesson) // BAD BAD BAD BAD
        return { error: "none", materials: res, lesson: res_lesson[0] }
    }
    catch (err) {
        console.log("fetching lesson materials failed: ", err)
        return { error: "fetching-lesson-materials-failed" }
    }
}

export const fetchTraineeLessonExam = async (lesson_id) => {
    const res = await checkSession()
    if (res.error != "none" || res.user_data.classification != "trainee") return { error: "session-invalid" }

    try {
        const query_str_for_exam = `select * from exam where lesson_id = ${lesson_id};`
        const res_exam = await query(query_str_for_exam)
        if (res_exam[0] == null) return { error: "none", exam: [], questions: [] }

        const query_str_for_questions = `select * from question where exam_id = ${res_exam[0].exam_id};`
        const res_questions = await query(query_str_for_questions)
        return { error: "none", exam: res_exam, questions: res_questions }

    }
    catch (err) {
        console.log("fetching exam failed: ", err)
        return { error: "fetching-exam-failed" }
    }
}

export const addLessonLog = async (lesson_id) => {
    const res = await checkSession()
    if (res.error != "none" || res.user_data.classification != "trainee") return { error: "session-invalid" }

    try {
        const query_check = `select * from lesson_log where lesson_id = ${lesson_id} and account_id = ${res.user_data.account_id}`
        const query_check_res = await query(query_check)
        if (query_check_res.length > 0) return { error: "none" }

        const query_add = `insert into lesson_log (lesson_id, account_id) values (${lesson_id}, ${res.user_data.account_id})`
        await query(query_add)
        return { error: "none" }
    }
    catch (err) {
        console.log("inserting lesson log failed: ", err)
        return { error: "inserting-lesson-log-failed" }
    }
}

export const addCertificateLog = async (program_id) => {
    const res = await checkSession()
    if (res.error != "none" || res.user_data.classification != "trainee") return { error: "session-invalid" }

    try {
        const query_check = `select * from certificate_log where account_id = ${res.user_data.account_id} 
        and program_id = ${program_id}`
        const query_check_res = await query(query_check)
        if (query_check_res.length > 0) return { error: "already-exist" }

        const query_add = `insert into certificate_log (account_id, program_id) values (${res.user_data.account_id}, ${program_id})`
        await query(query_add)
        return { error: "none" }
    }
    catch (err) {
        console.log("inserting certificate log failed: ", err)
        return { error: "inserting-certificate-log-failed" }
    }
}

export const getCertificate = async (program_id) => {
    const res = await checkSession()
    if (res.error != "none" || res.user_data.classification != "trainee") return { error: "session-invalid" }

    try {
        const query_log = `select a.account_id, a.first_name, a.last_name, cl.date_acquired, p.name from 
        (program as p left join certificate_log as cl on p.program_id = cl.program_id left join account 
        as a on cl.account_id = a.account_id) where a.account_id = ${res.user_data.account_id} and p.program_id = ${program_id};`

        const query_log_res = await query(query_log)
        if (query_log_res.length <= 0) return { error: "certificate-missin" }

        return { error: "none", certificate: query_log_res }
    }
    catch (err) {
        console.log("fetching certificate failed: ", err)
        return { error: "fetching-certificate-failed" }
    }
}

export const addUserToProgram = async (program_id) => {
    const res = await checkSession()
    if (res.error != "none" || res.user_data.classification != "trainee") return { error: "session-invalid" }

    try {
        const query_check = `select * from program_users where program_id = ${program_id} AND account_id = ${res.user_data.account_id};`
        const res_check = await query(query_check)
        if (res_check.length > 0) return { error: "duplicate entry" }

        const query_str = `insert into program_users (program_id, account_id) values (${program_id}, ${res.user_data.account_id});`
        await query(query_str)
        return { error: "none" }
    }
    catch (err) {
        console.log("joining program failed: ", err)
        return { error: "joining-program-failed" }
    }
}