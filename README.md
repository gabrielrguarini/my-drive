# My Drive - Aplicação de Gerenciamento de Arquivos
My Drive é uma aplicação web para gerenciamento de arquivos que permite aos usuários fazer upload, visualizar e deletar arquivos armazenados no Amazon S3. Esta aplicação é construída usando o framework Next.js, aproveitando suas capacidades de renderização no servidor e geração estática. A aplicação também utiliza o AWS SDK para interagir com o serviço S3, fornecendo uma interface robusta e escalável para manipulação de arquivos.

## Funcionalidades
- Upload de Arquivos: Suporte para upload de imagens (.png, .jpg) e documentos PDF (.pdf).
- Visualização de Arquivos: Exibição de imagens e ícones de PDFs com URLs assinadas para acesso seguro.
- Deleção de Arquivos: Possibilidade de deletar arquivos diretamente da interface do usuário.
- Revalidação Automática: Atualização automática da lista de arquivos após o upload ou deleção de arquivos.
## Tecnologias Utilizadas
- Next.js: Framework React para renderização no servidor e geração estática.
- AWS S3: Serviço de armazenamento em nuvem da Amazon para armazenar e recuperar arquivos.
- AWS SDK: Biblioteca para interagir com os serviços da AWS, incluindo S3.
- Tailwind CSS: Framework CSS para estilização rápida e responsiva.
- React Dropzone: Biblioteca para implementar áreas de dropzone para upload de arquivos.
## Como executar o projeto
- Clone este repositório:
```bash
  git clone https://github.com/seu-usuario/my-drive.git
  cd my-drive
```
- Instale as dependências:
```bash
  npm install
```
- Configure as variáveis de ambiente no arquivo `.env`
```javascript
  BUCKET_NAME=seu-bucket-name
  AWS_ACCESS_KEY_ID=sua-access-key
  AWS_SECRET_ACCESS_KEY=sua-secret-key
```
- Execute a aplicação em modo de desenvolvimento
  ```bash
    npm run dev
  ```
- Abra o navegador e acesse http://localhost:3000.

## Exemplos de Uso
- Upload de Arquivos
- Arraste e solte arquivos na área designada ou clique para selecionar arquivos.
- Clique no botão "Enviar" para fazer o upload dos arquivos selecionados.
- Visualização de Arquivos
- Arquivos enviados serão listados na página inicial.
- Imagens serão exibidas com previews, enquanto PDFs terão um ícone de documento.
- Deleção de Arquivos
- Clique no ícone de lixeira sobreposto na imagem ou ícone do arquivo para deletar.
- Contribuição
- Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests. Para grandes mudanças, por favor, abra uma issue primeiro para discutir o que você gostaria de mudar.

# Contato
## 📧gabrielrguarini@gmail.com  📱[Whatsapp](https://web.whatsapp.com/?send=32985093749)
