import GoogleMapReact from 'google-map-react'
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal'

const MapUser = (): JSX.Element => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const defaultProps = {
    center: {
      lat: 35.8123061,
      lng: 51.0069424
    },
    zoom: 11
  }
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 cursor-pointer text-red-600"
        onClick={onOpen}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>

      <Modal
        className="overflow-auto max-h-screen max-w-[40rem] mx-4"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">نقشه</ModalHeader>
            <ModalBody className="p-10">
              <div
                className="border-1 border-black rounded-lg p-5 h-screen w-full"
              >
                <GoogleMapReact
                  bootstrapURLKeys={{ key: '' }}
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                >
                  <div>موقعیت</div>
                </GoogleMapReact>
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MapUser
