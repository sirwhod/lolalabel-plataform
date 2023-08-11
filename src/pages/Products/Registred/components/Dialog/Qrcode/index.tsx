import { NavLink } from 'react-router-dom'
import { CloseButton, Content, ContentQrcode, Overlay, Title } from './styled'
import { Download, QrCode as QrcodeIcon, X } from 'phosphor-react'
import { useState } from 'react'

interface QRCodeProps {
  productDataId: string
}

export function Qrcode({ productDataId }: QRCodeProps) {
  const [downloadLink, setDownloadLink] = useState<string>('')

  return (
    <div>
      <Overlay />
      <Content>
        <Title>
          <QrcodeIcon size={32} weight="fill" />
          QRCode
        </Title>

        <CloseButton asChild>
          <X size={16} weight="bold" />
        </CloseButton>

        <ContentQrcode>
          <a
            href={`http://localhost:3000/product/${productDataId}`}
            title={`http://localhost:3000/product/${productDataId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`http://localhost:3001/pr/qrcode/${productDataId}`}
              alt=""
            />
          </a>
          <span>
            Clique no qrCode para abrir a página do produto ou clique em baixar
            e o arquivo será salvo em SVG
          </span>
          <a
            href={downloadLink}
            download={`qrcode_${productDataId}.svg`}
            onClick={() =>
              setDownloadLink(
                `http://localhost:3001/pr/qrcode/${productDataId}`,
              )
            }
          >
            <Download /> Baixar
          </a>
        </ContentQrcode>
      </Content>
    </div>
  )
}
