import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/modal'
import { User } from '../schema/user'
import { useState } from 'react'

const AddUser = (props: { addUser: (user: User) => void; id: number }): JSX.Element => {
  const { addUser, id } = props
  const [user, setUser] = useState<User>({
    id: id,
    name: '',
    family: '',
    nationalCode: ''
  })

  const handleInput = (key: string, value: string): void => {
    setUser({ ...user, [key]: value })
  }
  const handleSubmit = (closeModal: () => void) => {
    addUser(user)
    setUser({
      id: id + 1,
      name: '',
      family: '',
      nationalCode: ''
    })
    closeModal()
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div className="flex">
      <Button onPress={onOpen} color="primary" className="flex-grow md:flex-grow-0">
        افزودن
      </Button>
      <Modal
        className="overflow-auto max-h-full max-w-[60rem] mx-4"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">افزودن</ModalHeader>
              <ModalBody className="p-10">
                <div className="flex flex-col md:flex-row gap-3 border-1 border-black rounded-lg p-5 justify-center items-center">
                  <Input
                    label="نام"
                    type="text"
                    labelPlacement="inside"
                    value={user.name}
                    onValueChange={(value) => handleInput('name', value)}
                  />
                  <Input
                    label="نام خانوادگی"
                    type="text"
                    labelPlacement="inside"
                    value={user.family}
                    onValueChange={(value) => handleInput('family', value)}
                  />
                  <Input
                    label="کدملی"
                    type="text"
                    labelPlacement="inside"
                    value={user.nationalCode}
                    onValueChange={(value) => handleInput('nationalCode', value)}
                  />
                  <ModalFooter className="flex flex-row-reverse">
                    <Button color="danger" onPress={onClose}>
                      بستن
                    </Button>
                    <Button color="primary" onPress={() => handleSubmit(onClose)}>
                      افزودن
                    </Button>
                  </ModalFooter>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default AddUser
