import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInJourney1716331238345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO journeys (title, description, nuts, user_id, created_at, updated_at)
            VALUES
                ('Participe do Webinar da Zenklub sobre Saúde Mental', 'Em tempos desafiadores, a Zenklub está planejando um evento gratuito e super importante, uma oportunidade valiosa para explorarmos juntos estratégias e práticas para cuidar da nossa saúde mental e entender como promover o bem-estar de todos no dia-a-dia. Instruções dessa Missão: 1. Registre-se: Garanta sua participação no link fornecido abaixo. 2. Prepare-se: Reserve um tempo para se desconectar das distrações e se concentrar em cuidar de si. 3. Participe: Conecte-se ao webinar no horário designado e esteja pronto(a) para absorver insights valiosos sobre saúde mental. 4. Aplique o que Aprendeu: Após o webinar, comprometa-se a aplicar pelo menos uma estratégia aprendida em sua rotina diária.', 190, (SELECT id FROM users WHERE email = 'fernanda.oliveira@ioasys.com'), NOW(), NOW()),
                ('Faça uma ação voluntária.', 'Se você está procurando uma maneira de fazer a diferença e contribuir para a sua comunidade, se voluntariar em uma ONG é uma escolha maravilhosa. Mesmo uma única ação voluntária pode ter um impacto significativo nas vidas das pessoas ao seu redor e no mundo em geral. Ao se juntar a uma ONG e participar de uma ação voluntária, você não apenas oferece seu tempo e habilidades, mas também tem a oportunidade de aprender e crescer. Você conhecerá pessoas incríveis, terá experiências enriquecedoras e poderá desenvolver novas habilidades enquanto trabalha em equipe para alcançar um objetivo comum. Além disso, o voluntariado pode trazer uma sensação de realização pessoal e satisfação ao saber que você está fazendo algo positivo e impactante. Mesmo que seja apenas por uma única ação, o que você contribuir fará a diferença na vida de alguém.', 60, (SELECT id FROM users WHERE email = 'gustavo.pereira@ioasys.com'), NOW(), NOW()),
                ('Ajude o RS', 'Diante dos desafios recentes que enfrentamos no Rio Grande do Sul, é mais importante do que nunca nos unirmos como comunidade e oferecer nosso apoio mútuo. Sua doação pode ser feita através de roupas, água, alimentos não-perecíveis e até mesmo um pouco do seu tempo! Além disso, também é importante considerar outras maneiras de ajudar, se você puder, como voluntariado em organizações locais, contribuição financeira para iniciativas de reconstrução e recuperação, ou até mesmo apoio psicossocial para aqueles que estão lidando com traumas e estresse emocional. A solidariedade e a colaboração são fundamentais para ajudar o Rio Grande do Sul a superar desafios e construir uma comunidade mais resiliente e unida. Cada gesto de apoio, por menor que seja, pode fazer uma grande diferença na vida das pessoas que mais precisam.', 15, (SELECT id FROM users WHERE email = 'helena.rocha@ioasys.com'), NOW(), NOW()),
                ('Feedback mensal: Nos ajude a melhorar compartilhando sua opinião!', 'Seu feedback é valioso e fundamental para o sucesso contínuo da nossa empresa. Ao compartilhar suas opiniões sinceras durante os feedbacks mensais, você está contribuindo não apenas para o seu crescimento pessoal, mas também para o desenvolvimento e aprimoramento da nossa cultura organizacional. Além disso, ao compartilhar suas perspectivas você está contribuindo para o alinhamento dos valores da empresa. Suas opiniões podem ajudar a identificar áreas de melhoria, impulsionar a inovação e garantir que todos estejam trabalhando na mesma direção, com base em metas e objetivos comuns.', 180, (SELECT id FROM users WHERE email = 'fernanda.oliveira@ioasys.com'), NOW(), NOW()),
                ('Happy hour global: Vamos todos nos reunir, participe!', 'Em um mundo onde as fronteiras parecem cada vez mais distantes, é importante lembrarmos da essência que nos une: a conexão humana. É com grande alegria que convido todos vocês para um momento especial de proximidade e camaradagem - nosso happy hour virtual! Neste momento, não importa em que parte do mundo você esteja, queremos criar um espaço onde possamos nos reunir, compartilhar risadas, conversas e experiências. Mesmo que estejamos separados por quilômetros, nosso vínculo como equipe transcende distâncias físicas. Este happy hour não é apenas uma oportunidade para relaxar e se divertir, mas também para reforçar os laços que nos unem como equipe. Nosso trabalho pode nos levar a diferentes lugares do mundo, mas é a nossa conexão uns com os outros que torna nossa jornada significativa e gratificante.', 180, (SELECT id FROM users WHERE email = 'gustavo.pereira@ioasys.com'), NOW(), NOW()),
                ('Promova um momento de mentoria reversa', 'Você já pensou no que a nova geração pode ensinar para líderes que já estão no mercado há anos? Essa missão propõe uma inversão de papéis: desafiamos você, líder experiente, a abrir-se para novas perspectivas e aprendizados com seus colaboradores mais jovens e entender quais os impactos positivos eles podem trazer para o seu dia-a-dia e você, que acabou de entrar no mercado, comece a pensar em como sua carreira ainda em construção pode nos ajudar a crescer!', 200, (SELECT id FROM users WHERE email = 'helena.rocha@ioasys.com'), NOW(), NOW());
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM journeys WHERE title IN (
                'Participe do Webinar da Zenklub sobre Saúde Mental',
                'Faça uma ação voluntária.',
                'Ajude o RS',
                'Feedback mensal: Nos ajude a melhorar compartilhando sua opinião!',
                'Happy hour global: Vamos todos nos reunir, participe!',
                'Promova um momento de mentoria reversa'
            );
        `);
    }

}
