const MAX_ATTEMPTS = 50

function pad(value: number): string {
    return String(value).padStart(2, '0')
}

export function generateOrderCode(
    existing: string[],
    now: Date = new Date(),
    random: () => number = Math.random,
): string {
    const prefix = `VLG-${pad(now.getFullYear() % 100)}${pad(now.getMonth() + 1)}${pad(now.getDate())}`
    const taken = new Set(existing)
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
        const code = `${prefix}-${Math.floor(1000 + random() * 9000)}`
        if (!taken.has(code)) return code
    }
    let serial = 1000
    while (taken.has(`${prefix}-${serial}`)) serial += 1
    return `${prefix}-${serial}`
}
