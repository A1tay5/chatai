const Week = {
  NewWeek() {
    const d1: any = new Date()
    const d2: any = new Date()
    d2.setMonth(0)
    d2.setDate(1)
    const rq = d1 - d2
    const s1 = Math.ceil(rq / (24 * 60 * 60 * 1000))
    const s2 = Math.ceil(s1 / 7)
    return s2
  }
}

export default Week
