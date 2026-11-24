export interface UsersInterface {
    id: number
    fullname: string
    email: string
    telephone: string
    password: string
    role: Role
}

export type Role = "User" | "Admin"

export const UsersData: UsersInterface[] = [
    {
        id: 1,
        fullname: 'Nguyễn Hoàng Nam',
        email: 'admin@gmail.com',
        telephone: '0901234567',
        password: 'admin',
        role: "Admin",
    },
    {
        id: 2,
        fullname: 'Trần Minh Thư',
        email: 'minhthu@gmail.com',
        telephone: '0912345678',
        password: 'minhthu',
        role: "User",
    },
    {
        id: 3,
        fullname: 'Lê Quốc Bảo',
        email: 'quocbao@gmail.com',
        telephone: '0987654321',
        password: 'quocbao',
        role: "User",
    },
    {
        id: 4,
        fullname: 'Phạm Ngọc Ánh',
        email: 'ngocanh@gmail.com',
        telephone: '0933445566',
        password: 'ngocanh',
        role: "User",
    },
    {
        id: 5,
        fullname: 'Võ Tấn Phát',
        email: 'tanphat@gmail.com',
        telephone: '0977889900',
        password: 'tanphat',
        role: "User",
    }
]