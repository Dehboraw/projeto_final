const db = require("./db") 

async function criar_estrutura(){
    try{
        await db.pool.query(`
            DROP TABLE IF EXISTS Cliente;
            CREATE TABLE Cliente (
                    id int NOT NULL AUTO_INCREMENT,
                    nome varchar(50) NOT NULL,
                    cpf char(14) NOT NULL,
                    celular char(14) NOT NULL,
                    email varchar(50) NOT NULL,
                    senha varchar(512) NOT NULL,
                    PRIMARY KEY (id),
                    UNIQUE KEY cpf (cpf),
                    UNIQUE KEY email (email)
              ) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
            INSERT INTO Cliente VALUES 
              (12,'Deh','45687126305','12365322587','teste@gmail.com','$2b$10$bPZvgQKCIjIHgC.LZ74A3e9KCdpfqHrecFLvt3ABXVxM3HF.TEUx.'),
              (13,'Mario souza','12345678900','41963254785','mario@gmail.com','$2b$10$sVuJe4F5fnFKZflxBitgwek.l2UgHErABxYReq20Rs.Mx380KjdcK'),
              (14,'Karl Marx','78945612300','119852414521','karlmarx@gmail.com','$2b$10$ZhvIESs4oY/dDKvwiPIacOyohznM30wbcSu5xneHeTGfZXY7B4qCK');

            DROP TABLE IF EXISTS Produto;
            CREATE TABLE Produto (
                    id int NOT NULL AUTO_INCREMENT,
                    nome varchar(80) NOT NULL,
                    descricao varchar(200) NOT NULL,
                    categoria varchar(80) NOT NULL,
                    preco varchar(50) NOT NULL,
                    caminho_img varchar(200) DEFAULT '/fotos/semfoto.png',
                    quantidade_img int DEFAULT '1',
                    PRIMARY KEY (id)
              ) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4;
            INSERT INTO Produto VALUES 
              (1,'Dom Casmurro','Clássico da literatura brasileira escrito por Machado de Assis. Publicado em 1899. Contém 256 páginas.','Literatura Brasileira','39.90','/fotos/dom_casmurro.png',1),
              (2,'1984','Romance distópico clássico sobre controle totalitário por George Orwell. Publicado em 1949. Contém 416 páginas.','Ficção Científica','45.00','/fotos/1984.png',1),
              (3,'O Senhor dos Anéis: A Sociedade do Anel','Primeiro volume da épica saga de fantasia criada por J.R.R. Tolkien. Publicado em 1954. Contém 576 páginas.','Fantasia','59.90','/fotos/senhor_dos_aneis_1.png',1),
              (4,'O Pequeno Príncipe','Fábula poética sobre amizade e amor de Antoine de Saint-Exupéry. Publicada em 1943. Contém 96 páginas.','Infantojuvenil','29.90','/fotos/pequeno_principe.png',1),
              (5,'Orgulho e Preconceito','Romance clássico focado nas relações da sociedade inglesa por Jane Austen. Publicado em 1813. Contém 424 páginas.','Romance','34.90','/fotos/orgulho_preconceito.png',1),
              (6,'A Revolução dos Bichos','Sátira política marcante sobre poder e corrupção por George Orwell. Publicada em 1945. Contém 152 páginas.','Ficção Científica','25.00','/fotos/revolucao_bichos.png',1),
              (7,'O Hobbit','A jornada de Bilbo Bolseiro em busca do tesouro dos anões por J.R.R. Tolkien. Publicado em 1937. Contém 336 páginas.','Fantasia','49.90','/fotos/o_hobbit.png',1),
              (8,'Cem Anos de Solidão','Obra-prima do realismo mágico escrita por Gabriel García Márquez. Publicada em 1967. Contém 448 páginas.','Ficção','64.90','/fotos/cem_anos_solidao.png',1),
              (9,'A Hora da Estrela','Romance marcante sobre a vida da nordestina Macabéa por Clarice Lispector. Publicado em 1977. Contém 88 páginas.','Literatura Brasileira','32.00','/fotos/hora_da_estrela.png',1),
              (10,'O Alquimista','Jornada espiritual e inspiradora escrita por Paulo Coelho. Publicada em 1988. Contém 208 páginas.','Autoajuda','39.90','/fotos/o_alquimista.png',1),
              (11,'Duna','Epopeia sci-fi no planeta desértico Arrakis escrita por Frank Herbert. Publicada em 1965. Contém 680 páginas.','Ficção Científica','69.90','/fotos/duna.png',1),
              (12,'Harry Potter e a Pedra Filosofal','O início da jornada do bruxo garoto escrita por J.K. Rowling. Publicado em 1997. Contém 224 páginas.','Fantasia','44.90','/fotos/hp_pedra_filosofal.png',1),
              (13,'O Apanhador no Campo de Centeio','Busca por identidade na juventude escrita por J.D. Salinger. Publicado em 1951. Contém 240 páginas.','Ficção','38.00','/fotos/apanhador_centeio.png',1),
              (14,'O Sol é Para Todos','Clássico sobre justiça e preconceito no sul dos EUA por Harper Lee. Publicado em 1960. Contém 352 páginas.','Ficção','42.90','/fotos/sol_para_todos.png',1),
              (15,'Sapiens: Uma Breve História da Humanidade','Análise sobre a evolução humana escrita por Yuval Noah Harari. Publicado em 2011. Contém 464 páginas.','História','59.00','/fotos/sapiens.png',1),
              (16,'O Código Da Vinci','Enigma e mistério envolvendo a história da arte por Dan Brown. Publicado em 2003. Contém 432 páginas.','Suspense','49.90','/fotos/codigo_da_vinci.png',1),
              (17,'A Menina que Roubava Livros','História de Liesel na Segunda Guerra narrada pela Morte por Markus Zusak. Publicada em 2005. Contém 480 páginas.','Drama','39.90','/fotos/menina_roubava_livros.png',1),
              (18,'Fahrenheit 451','Distopia em que os livros são proibidos e queimados por Ray Bradbury. Publicada em 1953. Contém 216 páginas.','Ficção Científica','36.90','/fotos/fahrenheit_451.png',1),
              (19,'O Silmarillion','As lendas e mitos primordiais da Terra-média por J.R.R. Tolkien. Publicado em 1977. Contém 480 páginas.','Fantasia','54.90','/fotos/silmarillion.png',1),
              (20,'Memórias Póstumas de Brás Cubas','Inovador romance narrado por um defunto autor por Machado de Assis. Publicado em 1881. Contém 224 páginas.','Literatura Brasileira','31.90','/fotos/bras_cubas.png',1),
              (21,'O Iluminado','Clássico do terror psicológico no Hotel Overlook por Stephen King. Publicado em 1977. Contém 520 páginas.','Terror','52.00','/fotos/o_iluminado.png',1),
              (22,'Grande Sertão: Veredas','Obra monumental da literatura nacional escrita por Guimarães Rosa. Publicada em 1956. Contém 608 páginas.','Literatura Brasileira','74.90','/fotos/grande_sertao.png',1),
              (23,'O Diário de Anne Frank','Relato real do esconderijo de Anne Frank durante a guerra. Publicado em 1947. Contém 352 páginas.','Biografia','35.00','/fotos/diario_anne_frank.png',1),
              (24,'Admirável Mundo Novo','Sociedade futurista controlada por tecnologia descrita por Aldous Huxley. Publicado em 1932. Contém 312 páginas.','Ficção Científica','41.90','/fotos/admiravel_mundo_novo.png',1),
              (25,'O Conde de Monte Cristo','Épico conto de traição e vingança escrito por Alexandre Dumas. Publicado em 1844. Contém 1376 páginas.','Aventura','89.90','/fotos/conde_monte_cristo.png',1),
              (26,'Crime e Castigo','Profundo estudo psicológico sobre culpa e redenção por Fiódor Dostoiévski. Publicado em 1866. Contém 592 páginas.','Literatura Clássica','58.00','/fotos/crime_e_castigo.png',1),
              (27,'O Retrato de Dorian Gray','Obra sobre vaidade, arte e moralidade escrita por Oscar Wilde. Publicada em 1890. Contém 240 páginas.','Literatura Clássica','36.00','/fotos/dorian_gray.png',1),
              (28,'Moby Dick','A obsessiva caçada à grande baleia branca por Herman Melville. Publicado em 1851. Contém 656 páginas.','Aventura','62.00','/fotos/moby_dick.png',1),
              (29,'A Metamorfose','A estranha transformação de Gregor Samsa descrita por Franz Kafka. Publicada em 1915. Contém 96 páginas.','Ficção','28.00','/fotos/metamorfose.png',1),
              (30,'O Nome da Rosa','Investigação policial num mosteiro medieval escrita por Umberto Eco. Publicado em 1980. Contém 560 páginas.','Suspense','59.90','/fotos/nome_da_rosa.png',1),
              (31,'Ensaio sobre a Cagueira','Aterrorizante metáfora sobre a condição humana escrita por José Saramago. Publicado em 1995. Contém 312 páginas.','Literatura Portuguesa','48.00','/fotos/ensaio_cegueira.png',1),
              (32,'O Cortiço','Obra naturalista brasileira sobre as habitações coletivas por Aluísio Azevedo. Publicado em 1890. Contém 272 páginas.','Literatura Brasileira','29.90','/fotos/o_cortico.png',1),
              (33,'Capitães da Areia','A vida de garotos de rua em Salvador escrita por Jorge Amado. Publicado em 1937. Contém 280 páginas.','Literatura Brasileira','38.00','/fotos/capitaes_da_areia.png',1),
              (34,'Vidas Secas','A dura travessia da família de Fabiano no sertão por Graciliano Ramos. Publicado em 1938. Contém 176 páginas.','Literatura Brasileira','34.00','/fotos/vidas_secas.png',1),
              (35,'Triste Fim de Policarpo Quaresma','Sátira ao nacionalismo ufanista escrita por Lima Barreto. Publicado em 1915. Contém 240 páginas.','Literatura Brasileira','31.00','/fotos/policarpo_quaresma.png',1),
              (36,'Drácula','O clássico romance epistolar de vampiros escrito por Bram Stoker. Publicado em 1897. Contém 480 páginas.','Terror','44.90','/fotos/dracula.png',1),
              (37,'Frankenstein','A criação do monstro pelo cientista Victor Frankenstein por Mary Shelley. Publicado em 1818. Contém 240 páginas.','Terror','37.00','/fotos/frankenstein.png',1),
              (38,'Neuromancer','Obra fundadora do gênero cyberpunk escrita por William Gibson. Publicada em 1984. Contém 320 páginas.','Ficção Científica','46.00','/fotos/neuromancer.png',1),
              (39,'Fundação','O início da queda do Império Galáctico segundo Isaac Asimov. Publicado em 1951. Contém 288 páginas.','Ficção Científica','49.00','/fotos/fundacao.png',1),
              (40,'O Guia do Mochileiro das Galáxias','Clássica comédia espacial e ficção científica por Douglas Adams. Publicado em 1979. Contém 208 páginas.','Ficção Científica','39.90','/fotos/guia_mochileiro.png',1);

        `)
    console.log("Migração de estrutura do bd finalizada")
    process.exit(0)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

criar_estrutura()

//criar um banco de dados de teste e altera no arquivo db o nome do banco
