export const NAME_MIN = 2
export const NAME_MAX = 50
export const COMMENT_MIN = 10
export const COMMENT_MAX = 500

export interface ReviewDraft {
    rating: number
    userName: string
    comment: string
}

export type ReviewErrors = Partial<Record<keyof ReviewDraft, string>>

export function validateReview(draft: ReviewDraft): ReviewErrors {
    const errors: ReviewErrors = {}
    const name = draft.userName.trim()
    const comment = draft.comment.trim()

    if (!Number.isInteger(draft.rating) || draft.rating < 1 || draft.rating > 5) {
        errors.rating = 'Vui lòng chọn số sao.'
    }
    if (name.length < NAME_MIN || name.length > NAME_MAX) {
        errors.userName = `Tên hiển thị cần từ ${NAME_MIN} đến ${NAME_MAX} ký tự.`
    }
    if (comment.length < COMMENT_MIN || comment.length > COMMENT_MAX) {
        errors.comment = `Nhận xét cần từ ${COMMENT_MIN} đến ${COMMENT_MAX} ký tự.`
    }

    return errors
}

export function todayIso(now: Date = new Date()): string {
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${now.getFullYear()}-${month}-${day}`
}

export function newReviewId(now: number = Date.now()): string {
    return `mine-${now.toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}
