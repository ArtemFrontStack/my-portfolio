# 📧 Обновление EmailJS шаблона

## Новая структура формы:

Форма теперь содержит следующие поля:

- **Имя** (from_name): Как к вам обращаться?
- **Email** (from_email): Ваш email
- **Описание проекта** (project): Краткое описание проекта
- **Способ связи** (contact_method): telegram, whatsapp, vk, discord, email
- **Контактные данные** (contact_value): @username, номер телефона, id и т.д.

## 🔄 Обновите ваш EmailJS шаблон:

Перейдите на https://dashboard.emailjs.com/admin/templates/template_76u11al/content

### HTML шаблон письма:

```html
<div
	style="font-family: system-ui, sans-serif, Arial; font-size: 14px; max-width: 600px;"
>
	<div
		style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;"
	>
		<h2 style="color: white; margin: 0; font-size: 24px;">
			🎉 Новая заявка с портфолио!
		</h2>
	</div>

	<div
		style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;"
	>
		<div style="margin-bottom: 25px;">
			<div style="display: flex; align-items: center; margin-bottom: 15px;">
				<div
					style="
            padding: 10px;
            background-color: #f0f4ff;
            border-radius: 8px;
            font-size: 28px;
            margin-right: 15px;
          "
				>
					👤
				</div>
				<div>
					<div style="color: #2c3e50; font-size: 20px; font-weight: bold;">
						{{from_name}}
					</div>
					<div style="color: #7f8c8d; font-size: 14px; margin-top: 5px;">
						📧 {{from_email}}
					</div>
				</div>
			</div>
		</div>

		<div
			style="
        margin-bottom: 20px;
        padding: 20px;
        background-color: #f8f9fa;
        border-left: 4px solid #667eea;
        border-radius: 5px;
      "
		>
			<div
				style="color: #7f8c8d; font-size: 12px; text-transform: uppercase; margin-bottom: 8px; font-weight: 600;"
			>
				📝 Описание проекта
			</div>
			<div style="color: #2c3e50; font-size: 16px; line-height: 1.6;">
				{{project}}
			</div>
		</div>

		<div
			style="
        margin-bottom: 20px;
        padding: 20px;
        background-color: #fff3cd;
        border-left: 4px solid #ffc107;
        border-radius: 5px;
      "
		>
			<div
				style="color: #856404; font-size: 12px; text-transform: uppercase; margin-bottom: 8px; font-weight: 600;"
			>
				📞 Способ связи
			</div>
			<div
				style="color: #2c3e50; font-size: 16px; font-weight: 600; margin-bottom: 5px;"
			>
				{{contact_method}}
			</div>
			<div style="color: #495057; font-size: 15px;">{{contact_value}}</div>
		</div>

		<div
			style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;"
		>
			<p style="color: #7f8c8d; font-size: 12px; margin: 0;">
				Это письмо было отправлено с вашего портфолио
			</p>
		</div>
	</div>
</div>
```

### Тема письма (Subject):

```
🎉 Новая заявка от {{from_name}} | {{contact_method}}
```

### To email (Кому):

```
artem2006pax@mail.ru
```

## ✅ После обновления:

1. Сохраните изменения в EmailJS
2. Проверьте работу формы - отправьте тестовое сообщение
3. Убедитесь, что письмо приходит с правильным форматированием

---

**Важно:** Все переменные ({{from_name}}, {{from_email}}, {{project}}, {{contact_method}}, {{contact_value}}) автоматически заполняются из формы.
