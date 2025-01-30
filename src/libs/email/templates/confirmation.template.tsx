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

export function ConfirmationTemplate({
  domain,
  token,
}: ConfirmationTemplateProps) {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  return (
    <Tailwind>
      <Html>
        <Body className="text-black">
          <Heading>Подтверждение почты</Heading>
          <Text>
            Что бы подтвердить свой адрес электронной почты, пожалуйста,
            перейдите по следующей ссылке:
          </Text>
          <Link href={confirmLink}>Подтвердить почту</Link>
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
