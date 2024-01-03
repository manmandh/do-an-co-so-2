import React, { useContext, useState } from 'react'
import { UserContext } from '~/context/UserContext'
import Button from '../../components/Button/Button'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '~/context/AppContext'

const Profile = () => {
	const { user, setUser } = useContext(UserContext)
	const { setCartList } = useContext(AppContext)
	const navigate = useNavigate()
	const [profileAccount, setProfileAccount] = useState({
		username: user.username,
		email: user.email,
		phone: user.phone,
		date: user.date,
		sex: user.sex,
		address: user.address,
		_id: user._id,
	})

	const handleUpdate = () => {
		axios
			.put(`http://localhost:5000/user`, profileAccount)
			.then((res) => {
				console.log(res.data)
				toast.success(res.data.msg)
				setUser((prev) => ({ ...prev, ...profileAccount }))
			})
			.catch((err) => toast.error(err))
	}

	const handleLogout = () => {
		setUser({})
		localStorage.setItem('isLogin', false)
		setCartList([])
		navigate('/auth')
	}

	return (
		<div>
			<h1 className='text-5xl ss-title py-2'>Thông tin cá nhân:</h1>
			<div className='mt-[5rem] flex flex-col gap-8'>
				<div className='grid grid-cols-4 gap-8 items-center'>
					<label
						htmlFor='username'
						className='col-span-1 align-middle'
					>
						Username:
					</label>
					<input
						type='text'
						placeholder='Nhập username của bạn'
						className='col-span-3'
						value={profileAccount.username}
						onChange={(e) =>
							setProfileAccount({ ...profileAccount, username: e.target.value })
						}
					/>
				</div>
				<div className='grid grid-cols-4 gap-8 items-center'>
					<label
						htmlFor='username'
						className='col-span-1 align-middle'
					>
						Email:
					</label>
					<input
						type='text'
						placeholder='Nhập email của bạn'
						className='col-span-3'
						value={profileAccount.email}
						onChange={(e) =>
							setProfileAccount({ ...profileAccount, email: e.target.value })
						}
					/>
				</div>
				<div className='grid grid-cols-4 gap-8 items-center'>
					<label
						htmlFor='username'
						className='col-span-1 align-middle'
					>
						Địa chỉ:
					</label>
					<input
						type='text'
						placeholder='Nhập địa chỉ của bạn'
						className='col-span-3'
						value={profileAccount.address}
						onChange={(e) =>
							setProfileAccount({ ...profileAccount, address: e.target.value })
						}
					/>
				</div>
				<div className='grid grid-cols-4 gap-8 items-center'>
					<label
						htmlFor='username'
						className='col-span-1 align-middle'
					>
						Số điện thoại:
					</label>
					<input
						type='text'
						placeholder='Nhập số điện thoại của bạn'
						className='col-span-3 bg-transparent'
						value={profileAccount.phone}
						onChange={(e) =>
							setProfileAccount({ ...profileAccount, phone: e.target.value })
						}
					/>
				</div>
				<div className='grid grid-cols-4 gap-8 items-center'>
					<label
						htmlFor='username'
						className='col-span-1 align-middle'
					>
						Ngày sinh:
					</label>
					<input
						type='date'
						placeholder='Nhập ngày sinh của bạn'
						className='col-span-3 bg-transparent outline-none'
						value={profileAccount.date}
						onChange={(e) =>
							setProfileAccount({ ...profileAccount, date: e.target.value })
						}
					/>
				</div>
				<div className='grid grid-cols-4 gap-8 items-center'>
					<label
						htmlFor='username'
						className='col-span-1 align-middle'
					>
						Giới tính:
					</label>
					<select
						className='outline-none bg-transparent border-[#ccc] border-solid border rounded-lg py-2 px-4 cursor-pointer'
						onChange={(e) =>
							setProfileAccount({ ...profileAccount, sex: e.target.value })
						}
						value={profileAccount.sex}
					>
						<option value=''>None</option>
						<option value='Nam'>Nam</option>
						<option value='Nữ'>Nữ</option>
						<option value='Khác'>Khác</option>
					</select>
				</div>
				<div className='self-end'>
					<Button
						bg
						xl
						onClick={handleUpdate}
					>
						Cập nhật thông tin
					</Button>
				</div>
				<div className='self-end'>
					<Button
						bg
						xl
						onClick={handleLogout}
						startIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
					>
						Đăng xuất
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Profile
