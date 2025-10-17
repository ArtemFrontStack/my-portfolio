import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {EMAILJS_CONFIG} from '@/config/emailjs.config'
import emailjs from '@emailjs/browser'
import {AlertCircle, CheckCircle2, Send} from 'lucide-react'
import {useState} from 'react'
import {toast} from 'sonner'

interface FormErrors {
	name?: string
	email?: string
	project?: string
	phone?: string
	telegram?: string
	vk?: string
}

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		project: '',
		phone: '',
		telegram: '',
		vk: '',
	})
	const [errors, setErrors] = useState<FormErrors>({})
	const [touched, setTouched] = useState({
		name: false,
		email: false,
		project: false,
		phone: false,
		telegram: false,
		vk: false,
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [consent, setConsent] = useState(false)
	const [consentError, setConsentError] = useState('')

	const validateEmail = (email: string) => {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		return emailRegex.test(email.trim())
	}

	const validateName = (name: string) => {
		// Только одна часть, первая буква заглавная, остальные — строчные
		// Поддержка кириллицы и латиницы
		const nameRegex = /^[A-ZА-ЯЁ][a-zа-яё]+$/u
		return nameRegex.test(name)
	}

	const validateTelegram = (username: string) => {
		// Проверка на формат @username или t.me/username
		const telegramRegex =
			/^(@[\w]{5,}|https?:\/\/(t\.me|telegram\.me)\/[\w]{5,})$/
		return telegramRegex.test(username.trim())
	}

	const validatePhone = (phone: string) => {
		// Корректная проверка на российский номер
		// Поддерживает: 7924462039, +7 (924) 462-03-39, 8 924 462 03 39, +7924462039, 8924462039
		const digits = phone.replace(/\D/g, '')
		// 11 цифр, начинается с 7 или 8
		if (/^7\d{10}$/.test(digits) || /^8\d{10}$/.test(digits)) {
			return true
		}
		// 10 цифр, начинается с 9 (короткая запись без кода страны)
		if (/^9\d{9}$/.test(digits)) {
			return true
		}
		// +7XXXXXXXXXX
		if (/^\+7\d{10}$/.test(phone.replace(/\D/g, ''))) {
			return true
		}
		return false
	}

	const validateVK = (vkId: string) => {
		// Проверка на формат id123456 или vk.com/id123456
		const vkRegex = /^(id\d+|https?:\/\/vk\.com\/(id\d+|[\w.]+))$/
		return vkRegex.test(vkId.trim())
	}

	const validateDiscord = (discord: string) => {
		// Проверка на формат username#1234 или новый формат @username
		const discordRegex = /^(@?[\w]{2,32}#?\d{0,4})$/
		return discordRegex.test(discord.trim())
	}

	const hasOnlyWhitespace = (str: string) => {
		return str.trim().length === 0 && str.length > 0
	}

	const validateForm = () => {
		const newErrors: FormErrors = {}

		// Валидация имени
		if (!formData.name.trim()) {
			newErrors.name = 'Имя обязательно для заполнения'
		} else if (hasOnlyWhitespace(formData.name)) {
			newErrors.name = 'Имя не может состоять только из пробелов'
		} else if (formData.name.trim().length < 2) {
			newErrors.name = 'Имя должно содержать минимум 2 символа'
		} else if (formData.name.trim().length > 50) {
			newErrors.name = 'Имя не должно превышать 50 символов'
		} else if (!validateName(formData.name.trim())) {
			newErrors.name =
				'Имя должно начинаться с заглавной буквы, остальные — строчные'
		}

		// Валидация email
		if (!formData.email.trim()) {
			newErrors.email = 'Email обязателен для заполнения'
		} else if (hasOnlyWhitespace(formData.email)) {
			newErrors.email = 'Email не может состоять только из пробелов'
		} else if (!validateEmail(formData.email)) {
			newErrors.email = 'Введите корректный email адрес'
		} else if (formData.email.trim().length > 100) {
			newErrors.email = 'Email не должен превышать 100 символов'
		}

		// Валидация описания проекта
		if (!formData.project.trim()) {
			newErrors.project = 'Описание проекта обязательно'
		} else if (hasOnlyWhitespace(formData.project)) {
			newErrors.project = 'Описание не может состоять только из пробелов'
		} else if (formData.project.trim().length < 10) {
			newErrors.project = 'Описание должно содержать минимум 10 символов'
		} else if (formData.project.trim().length > 500) {
			newErrors.project = 'Описание не должно превышать 500 символов'
		}

		// Телефон теперь обязателен
		if (!formData.phone.trim()) {
			newErrors.phone = 'Телефон обязателен для заполнения'
		} else if (hasOnlyWhitespace(formData.phone)) {
			newErrors.phone = 'Телефон не может состоять только из пробелов'
		} else if (!validatePhone(formData.phone)) {
			newErrors.phone = 'Введите корректный номер телефона'
		}
		// Необязательные поля: telegram, vk
		if (formData.telegram && !validateTelegram(formData.telegram)) {
			newErrors.telegram = 'Введите корректный Telegram (@username или ссылку)'
		}
		if (formData.vk && !validateVK(formData.vk)) {
			newErrors.vk = 'Введите корректный ВК (id или ссылку)'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleBlur = (field: keyof typeof touched) => {
		setTouched({ ...touched, [field]: true })
		validateForm()
	}

	const handleChange = (field: keyof typeof formData, value: string) => {
		setFormData({ ...formData, [field]: value })

		// Live-валидация для всех полей
		if (
			['email', 'name', 'phone', 'telegram', 'vk', 'project'].includes(field)
		) {
			if (!touched[field] && value.length > 0) {
				setTouched({ ...touched, [field]: true })
			}
			const newErrors: FormErrors = { ...errors }

			if (field === 'email') {
				if (!value.trim()) {
					newErrors.email = 'Email обязателен для заполнения'
				} else if (hasOnlyWhitespace(value)) {
					newErrors.email = 'Email не может состоять только из пробелов'
				} else if (!validateEmail(value)) {
					newErrors.email = 'Введите корректный email адрес'
				} else if (value.trim().length > 100) {
					newErrors.email = 'Email не должен превышать 100 символов'
				} else {
					delete newErrors.email
				}
			}
			if (field === 'name') {
				if (!value.trim()) {
					newErrors.name = 'Имя обязательно для заполнения'
				} else if (hasOnlyWhitespace(value)) {
					newErrors.name = 'Имя не может состоять только из пробелов'
				} else if (value.trim().length < 2) {
					newErrors.name = 'Имя должно содержать минимум 2 символа'
				} else if (value.trim().length > 50) {
					newErrors.name = 'Имя не должно превышать 50 символов'
				} else if (!validateName(value.trim())) {
					newErrors.name =
						'Имя должно начинаться с заглавной буквы, остальные — строчные'
				} else {
					delete newErrors.name
				}
			}
			if (field === 'phone') {
				if (!value.trim()) {
					newErrors.phone = 'Телефон обязателен для заполнения'
				} else if (hasOnlyWhitespace(value)) {
					newErrors.phone = 'Телефон не может состоять только из пробелов'
				} else if (!validatePhone(value)) {
					newErrors.phone = 'Введите корректный номер телефона'
				} else {
					delete newErrors.phone
				}
			}
			if (field === 'telegram') {
				if (value && !validateTelegram(value)) {
					newErrors.telegram =
						'Введите корректный Telegram (@username или ссылку)'
				} else {
					delete newErrors.telegram
				}
			}
			if (field === 'vk') {
				if (value && !validateVK(value)) {
					newErrors.vk = 'Введите корректный ВК (id или ссылку)'
				} else {
					delete newErrors.vk
				}
			}
			if (field === 'project') {
				if (!value.trim()) {
					newErrors.project = 'Описание проекта обязательно'
				} else if (hasOnlyWhitespace(value)) {
					newErrors.project = 'Описание не может состоять только из пробелов'
				} else if (value.trim().length < 10) {
					newErrors.project = 'Описание должно содержать минимум 10 символов'
				} else if (value.trim().length > 500) {
					newErrors.project = 'Описание не должно превышать 500 символов'
				} else {
					delete newErrors.project
				}
			}
			setErrors(newErrors)
		}
		// Для phone теперь обязательное поле, telegram и vk — необязательные
		else if (['phone', 'telegram', 'vk'].includes(field)) {
			const newErrors: FormErrors = { ...errors }
			if (field === 'phone') {
				if (!value.trim()) {
					newErrors.phone = 'Телефон обязателен для заполнения'
				} else if (hasOnlyWhitespace(value)) {
					newErrors.phone = 'Телефон не может состоять только из пробелов'
				} else if (!validatePhone(value)) {
					newErrors.phone = 'Введите корректный номер телефона'
				} else {
					delete newErrors.phone
				}
			}
			if (field === 'telegram') {
				if (value && !validateTelegram(value)) {
					newErrors.telegram =
						'Введите корректный Telegram (@username или ссылку)'
				} else {
					delete newErrors.telegram
				}
			}
			if (field === 'vk') {
				if (value && !validateVK(value)) {
					newErrors.vk = 'Введите корректный ВК (id или ссылку)'
				} else {
					delete newErrors.vk
				}
			}
			setErrors(newErrors)
		}
		// Для остальных полей валидируем только если поле было затронуто
		else if (touched[field]) {
			setTimeout(() => validateForm(), 0)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setTouched({
			name: true,
			email: true,
			project: true,
			phone: true,
			telegram: true,
			vk: true,
		})
		const isValid = validateForm()
		if (!consent) {
			setConsentError('Необходимо согласие с политикой конфиденциальности')
		} else {
			setConsentError('')
		}
		if (!isValid || !consent) {
			toast.error('Пожалуйста, исправьте ошибки в форме', {
				description: 'Проверьте правильность заполнения всех полей и согласие с политикой',
			})
			return
		}

		setIsSubmitting(true)

		try {
			// Отправка через EmailJS
			await emailjs.send(
				EMAILJS_CONFIG.SERVICE_ID,
				EMAILJS_CONFIG.TEMPLATE_ID,
				{
					from_name: formData.name,
					from_email: formData.email,
					phone: formData.phone,
					telegram: formData.telegram || '',
					vk: formData.vk || '',
					project: formData.project
				},
				EMAILJS_CONFIG.PUBLIC_KEY
			)

			toast.success('Спасибо за сообщение!', {
				description: 'Я свяжусь с вами в ближайшее время',
				icon: <CheckCircle2 className='w-5 h-5 text-green-500' />,
			})

			// Очищаем форму после успешной отправки
			setFormData({
				name: '',
				email: '',
				project: '',
				phone: '',
				telegram: '',
				vk: '',
			})
			setTouched({
				name: false,
				email: false,
				project: false,
				phone: false,
				telegram: false,
				vk: false,
			})
			setErrors({})
			setConsent(false) // очищаем чекбокс после отправки
		} catch (error) {
			console.error('Ошибка отправки:', error)
			toast.error('Не удалось отправить сообщение', {
				description: 'Попробуйте ещё раз или свяжитесь со мной напрямую',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConsent(e.target.checked)
		if (e.target.checked) setConsentError('')
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col min-h-[650px] h-full space-y-5 w-full min-w-0  justify-between'
		>
			<div className='flex flex-col space-y-5 w-full'>
				{/* Name Field */}
				<div className='space-y-2 w-full min-w-0'>
					<label
						className='block text-xs sm:text-sm text-muted-foreground font-medium mb-1'
						htmlFor='contact-name'
					>
						Имя <span className='text-destructive'>*</span>
					</label>
					<div className='relative'>
						<Input
							id='contact-name'
							placeholder='Как к вам обращаться?'
							value={formData.name}
							onChange={e => handleChange('name', e.target.value)}
							onBlur={() => handleBlur('name')}
							maxLength={50}
							className={`bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 text-sm sm:text-base h-11 sm:h-12 focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary  ${
								errors.name && touched.name
									? 'border-red-500/70 focus:ring-red-500/60 focus:border-red-500'
									: formData.name && !errors.name && touched.name
										? 'border-green-500/70 focus:ring-green-500/60 focus:border-green-500'
										: 'border-primary/20 hover:border-primary/40'
							}`}
						/>
						{errors.name && touched.name ? (
							<AlertCircle className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500' />
						) : formData.name && !errors.name && touched.name ? (
							<CheckCircle2 className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500' />
						) : null}
					</div>
					{errors.name && touched.name ? (
						<p className='text-xs sm:text-sm text-red-500 flex items-center gap-1 animate-fade-in'>
							<AlertCircle className='w-3 h-3' />
							{errors.name}
						</p>
					) : formData.name && !errors.name && touched.name ? (
						<p className='text-xs sm:text-sm text-green-600 flex items-center gap-1 animate-fade-in'>
							<CheckCircle2 className='w-3 h-3' />
							Имя введено корректно
						</p>
					) : null}
				</div>

				{/* Email Field */}
				<div className='space-y-2 w-full min-w-0'>
					<label
						className='block text-xs sm:text-sm text-muted-foreground font-medium mb-1'
						htmlFor='contact-email'
					>
						Email <span className='text-destructive'>*</span>
					</label>
					<div className='relative'>
						<Input
							id='contact-email'
							type='email'
							placeholder='Ваш email'
							value={formData.email}
							onChange={e => handleChange('email', e.target.value)}
							onBlur={() => handleBlur('email')}
							maxLength={100}
							className={`bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 text-sm sm:text-base h-11 sm:h-12 focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary ${
								errors.email && touched.email
									? 'border-red-500/70 focus:ring-red-500/60 focus:border-red-500'
									: formData.email && !errors.email && touched.email
										? 'border-green-500/70 focus:ring-green-500/60 focus:border-green-500'
										: 'border-primary/20 hover:border-primary/40'
							}`}
						/>
						{errors.email && touched.email ? (
							<AlertCircle className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500' />
						) : formData.email && !errors.email && touched.email ? (
							<CheckCircle2 className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500' />
						) : null}
					</div>
					{errors.email && touched.email ? (
						<p className='text-xs sm:text-sm text-red-500 flex items-center gap-1 animate-fade-in'>
							<AlertCircle className='w-3 h-3' />
							{errors.email}
						</p>
					) : formData.email && !errors.email && touched.email ? (
						<p className='text-xs sm:text-sm text-green-600 flex items-center gap-1 animate-fade-in'>
							<CheckCircle2 className='w-3 h-3' />
							Email введён корректно
						</p>
					) : null}
				</div>
				{/* Phone Field (optional) */}
				<div className='space-y-2 w-full min-w-0'>
					<label
						className='block text-xs sm:text-sm text-muted-foreground font-medium mb-1'
						htmlFor='contact-phone'
					>
						Телефон <span className='text-destructive'>*</span>
					</label>
					<div className='relative'>
						<Input
							id='contact-phone'
							type='tel'
							placeholder='Введите номер телефона'
							value={formData.phone}
							onChange={e => handleChange('phone', e.target.value)}
							onBlur={() => handleBlur('phone')}
							maxLength={30}
							className={`bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 text-sm sm:text-base h-11 sm:h-12 focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary ${
								errors.phone && touched.phone
									? 'border-red-500/70 focus:ring-red-500/60 focus:border-red-500'
									: formData.phone && !errors.phone && touched.phone
										? 'border-green-500/70 focus:ring-green-500/60 focus:border-green-500'
										: 'border-primary/20 hover:border-primary/40'
							}`}
						/>
						{errors.phone && touched.phone ? (
							<AlertCircle className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500' />
						) : formData.phone && !errors.phone && touched.phone ? (
							<CheckCircle2 className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500' />
						) : null}
					</div>
					{errors.phone && touched.phone ? (
						<p className='text-xs sm:text-sm text-red-500 flex items-center gap-1 animate-fade-in'>
							<AlertCircle className='w-3 h-3' />
							{errors.phone}
						</p>
					) : !errors.phone && touched.phone ? (
						<p className='text-xs sm:text-sm text-green-600 flex items-center gap-1 animate-fade-in'>
							<CheckCircle2 className='w-3 h-3' />
							Телефон введён корректно
						</p>
					) : null}
				</div>

				{/* Telegram Field (optional) */}
				<div className='space-y-2 w-full min-w-0'>
					<label
						className='block text-xs sm:text-sm text-muted-foreground font-medium mb-1'
						htmlFor='contact-telegram'
					>
						Telegram{' '}
						<span className='text-muted-foreground'>(необязательно)</span>
					</label>
					<div className='relative'>
						<Input
							id='contact-telegram'
							placeholder='Ссылка на Telegram или @username'
							value={formData.telegram}
							onChange={e => handleChange('telegram', e.target.value)}
							onBlur={() => handleBlur('telegram')}
							maxLength={50}
							className={`bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 text-sm sm:text-base h-11 sm:h-12 focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary ${
								errors.telegram && touched.telegram
									? 'border-red-500/70 focus:ring-red-500/60 focus:border-red-500'
									: formData.telegram && !errors.telegram && touched.telegram
										? 'border-green-500/70 focus:ring-green-500/60 focus:border-green-500'
										: 'border-primary/20 hover:border-primary/40'
							}`}
						/>
						{errors.telegram && touched.telegram ? (
							<AlertCircle className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500' />
						) : formData.telegram && !errors.telegram && touched.telegram ? (
							<CheckCircle2 className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500' />
						) : null}
					</div>
					{errors.telegram && touched.telegram ? (
						<p className='text-xs sm:text-sm text-red-500 flex items-center gap-1 animate-fade-in'>
							<AlertCircle className='w-3 h-3' />
							{errors.telegram}
						</p>
					) : formData.telegram && !errors.telegram && touched.telegram ? (
						<p className='text-xs sm:text-sm text-green-600 flex items-center gap-1 animate-fade-in'>
							<CheckCircle2 className='w-3 h-3' />
							Telegram введён корректно
						</p>
					) : null}
				</div>

				{/* VK Field (optional) */}
				<div className='space-y-2 w-full min-w-0'>
					<label
						className='block text-xs sm:text-sm text-muted-foreground font-medium mb-1'
						htmlFor='contact-vk'
					>
						VK <span className='text-muted-foreground'>(необязательно)</span>
					</label>
					<div className='relative'>
						<Input
							id='contact-vk'
							placeholder='Ссылка на VK или id'
							value={formData.vk}
							onChange={e => handleChange('vk', e.target.value)}
							onBlur={() => handleBlur('vk')}
							maxLength={50}
							className={`bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 text-sm sm:text-base h-11 sm:h-12 focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary ${
								errors.vk && touched.vk
									? 'border-red-500/70 focus:ring-red-500/60 focus:border-red-500'
									: formData.vk && !errors.vk && touched.vk
										? 'border-green-500/70 focus:ring-green-500/60 focus:border-green-500'
										: 'border-primary/20 hover:border-primary/40'
							}`}
						/>
						{errors.vk && touched.vk ? (
							<AlertCircle className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500' />
						) : formData.vk && !errors.vk && touched.vk ? (
							<CheckCircle2 className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500' />
						) : null}
					</div>
					{errors.vk && touched.vk ? (
						<p className='text-xs sm:text-sm text-red-500 flex items-center gap-1 animate-fade-in'>
							<AlertCircle className='w-3 h-3' />
							{errors.vk}
						</p>
					) : formData.vk && !errors.vk && touched.vk ? (
						<p className='text-xs sm:text-sm text-green-600 flex items-center gap-1 animate-fade-in'>
							<CheckCircle2 className='w-3 h-3' />
							VK введён корректно
						</p>
					) : null}
				</div>

				{/* Project Description Field */}
				<div className='space-y-2 w-full min-w-0'>
					<label
						className='block text-xs sm:text-sm text-muted-foreground font-medium mb-1'
						htmlFor='contact-project'
					>
						Описание проекта <span className='text-destructive'>*</span>
					</label>
					<div className='relative'>
						<Textarea
							id='contact-project'
							placeholder='Краткое описание вашего проекта'
							value={formData.project}
							onChange={e => handleChange('project', e.target.value)}
							onBlur={() => handleBlur('project')}
							rows={8}
							maxLength={500}
							className={`  bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 resize-none text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary ${
								errors.project && touched.project
									? 'border-red-500/70 focus:ring-red-500/60 focus:border-red-500'
									: formData.project && !errors.project && touched.project
										? 'border-green-500/70 focus:ring-green-500/60 focus:border-green-500'
										: 'border-primary/20 hover:border-primary/40'
							}`}
						/>
						{errors.project && touched.project ? (
							<AlertCircle className='absolute right-3 top-3 w-5 h-5 text-red-500' />
						) : formData.project && !errors.project && touched.project ? (
							<CheckCircle2 className='absolute right-3 top-3 w-5 h-5 text-green-500' />
						) : null}
					</div>
					{errors.project && touched.project ? (
						<p className='text-xs sm:text-sm text-red-500 flex items-center gap-1 animate-fade-in'>
							<AlertCircle className='w-3 h-3' />
							{errors.project}
						</p>
					) : formData.project && !errors.project && touched.project ? (
						<p className='text-xs sm:text-sm text-green-600 flex items-center gap-1 animate-fade-in'>
							<CheckCircle2 className='w-3 h-3' />
							Описание заполнено корректно
						</p>
					) : null}
					<p className='text-xs text-muted-foreground flex justify-between'>
						<span>
							<span
								className={
									formData.project.trim().length < 10
										? 'text-red-500'
										: 'text-green-500'
								}
							>
								{formData.project.trim().length}
							</span>
							{' / 500 символов'}
						</span>
						{formData.project.trim().length >= 10 && (
							<span className='text-green-500 font-medium'>✓ Готово</span>
						)}
					</p>
				</div>
			</div>
			<div className='flex flex-col w-full gap-4'>
				{/* Consent Checkbox */}
				<div className='flex items-start mt-2 mb-2 '>
					<label htmlFor='consent' className='flex items-center cursor-pointer select-none'>
					<span className='relative flex items-center'>
						<input
							type='checkbox'
							id='consent'
							checked={consent}
							onChange={handleConsentChange}
							className='peer appearance-none w-5 h-5 border-2 border-primary/40 rounded-md bg-background transition-all duration-300 mr-2 checked:bg-gradient-to-br checked:from-primary checked:via-accent checked:to-primary checked:border-primary focus:outline-none focus:ring-0 focus:border-primary/40'
						/>
						<span className='pointer-events-none absolute left-0 top-0 w-5 h-5 flex items-center justify-center'>
							<svg
								className='opacity-0 peer-checked:opacity-100 transition-opacity duration-200 text-white'
								width='18'
								height='18'
								viewBox='0 0 18 18'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M4 9.5L8 13L14 6'
									stroke='currentColor'
									strokeWidth='2.2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</span>
					</span>
						<span className='text-xs sm:text-sm text-muted-foreground'>
						Я даю согласие на обработку персональных данных и принимаю условия{' '}
							<a
								href='/privacy.html'
								target='_blank'
								className='underline text-primary hover:text-accent'
							>
							политики конфиденциальности
						</a>{' '}
							<span className='text-destructive'>*</span>
					</span>
					</label>
				</div>
				{consentError && (
					<p className='text-xs text-red-500 flex items-center gap-1 animate-fade-in mb-2'>
						<AlertCircle className='w-3 h-3' />
						{consentError}
					</p>
				)}

				{/* Submit Button */}
				<Button
					type='submit'
					size='lg'
					disabled={isSubmitting}
					className='w-full bg-gradient-to-r from-primary via-accent to-primary bg-size-200 hover:bg-pos-100 hover:shadow-lg hover:shadow-primary/30 transition-all duration-500 h-11 sm:h-12 text-sm sm:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
				>
					{isSubmitting ? (
						<>
						<span className='inline-flex items-center gap-2'>
							<span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
							Отправка...
						</span>
						</>
					) : (
						<>
							<Send className='w-4 h-4 sm:w-5 sm:h-5 mr-2' />
							Отправить заявку
						</>
					)}
				</Button>
			</div>

		</form>
	)
}

export default ContactForm
