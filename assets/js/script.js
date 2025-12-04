window.onload = () => {
    let ddayDom = document.querySelector("#dday")
    let pctDom = document.querySelector("#pct")
    let progressbar = document.querySelector("#progress")

    let salaryDom = document.querySelector("#salary")

    let surplusPrmDaysDom = document.querySelector("#surplusPromotionDays")
    let curDaysDom = document.querySelector("#currentWorkingDays")
    let totalDaysDom = document.querySelector("#totalWorkingDays")

    let startDate = new Date("2024-10-24")
    let endDate = new Date("2026-07-24") // 하루 뒤로 밀어서 쓰기. 즉, 소집 해제 직후 날짜.

    let agent = new Personnel(startDate)

    let class_ = agent.getClass(new Date())
    salaryDom.textContent = `${class_} ${agent.getSalary(class_).toLocaleString()} 원`
    surplusPrmDaysDom.textContent = agent.getSurplusPrommotionDays()

    let salaryViewDom = document.querySelector("#salaryView")

    let salaryPerDay = agent.getSalary(class_) / 30
    let salary = salaryPerDay * getDays(new Date())
    salaryViewDom.textContent = `${salary.toLocaleString()} KRW`

    let dateRangeViewDom = document.querySelector("#dateRangeView")

    let date = new Date()
    let currentRangeStart = new Date(date.getFullYear(), date.getMonth(), 1)
    let currentRangeEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    dateRangeViewDom.textContent = `${currentRangeStart.format()} ~ ${currentRangeEnd.format()}`

    setInterval(() => {
        const maxDelta = (endDate - startDate)
        let pctValue = 100 - ((endDate - new Date()) / maxDelta * 100)
        pctDom.textContent = `${pctValue.toFixed(7)}%`

        totalDaysDom.textContent = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24))
        ddayDom.textContent = `D-${Math.floor((endDate - new Date()) / (1000 * 60 * 60 * 24))}`
        curDaysDom.textContent = agent.getCurrentWorkingDays()
        progressbar.value = pctValue
    }, 10)

    function refreshSalaryView() {
        let salaryPerDay = agent.getSalary(agent.getClass(date)) / 30
        let salary = salaryPerDay * getDays(date)
        salaryViewDom.textContent = `${salary.toLocaleString()} KRW`
    }

    document.querySelector("#beforeBtn").onclick = () => {
        date = new Date(date.getFullYear(), date.getMonth() - 1, 15)
        let currentRangeStart = new Date(date.getFullYear(), date.getMonth(), 1)
        let currentRangeEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        dateRangeViewDom.textContent = `${currentRangeStart.format()} ~ ${currentRangeEnd.format()}`
        refreshSalaryView()
    }

    document.querySelector("#nextBtn").onclick = () => {
        date = new Date(date.getFullYear(), date.getMonth() + 1, 15)
        let currentRangeStart = new Date(date.getFullYear(), date.getMonth(), 1)
        let currentRangeEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        dateRangeViewDom.textContent = `${currentRangeStart.format()} ~ ${currentRangeEnd.format()}`
        refreshSalaryView()
    }
}