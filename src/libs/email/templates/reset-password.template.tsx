import {
    Body,
    Heading,
    Html,
    Link,
    Tailwind,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface ConfirmationTemplateProps {
    domain: string;
    token: string;
  }
  
  export function ResetPasswordTemplate({
    domain,
    token,
  }: ConfirmationTemplateProps) {
    const confirmLink = `${domain}/auth/new-password?token=${token}`;
  
    return (
      <Tailwind>
        <Html>
          <Body className="text-black">
            <Heading>Сброс пароля</Heading>
            <Text>
                Вы запросили сброс пароля. Пожайлуйста, перейдите по следующей ссылке, что бы создать новый пароль:
            </Text>
            <Link href={confirmLink}>Подтвердить сброс пароля</Link>
            <Text>
              Эта ссылка действительна в течении одного часа. Если вы не
              запрашивали подтверждение, просто проигнорируйте это сообщение.
            </Text>
            <Text>Спасибо за использование нашего сервиса</Text>
          </Body>
        </Html>
      </Tailwind>
    );
  }
  