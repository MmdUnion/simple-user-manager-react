import { Accordion, AccordionItem } from '@nextui-org/accordion'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import AddUser from './components/AddUser'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import ViewUser from './components/ViewUser'
import EditUser from './components/EditUser'
import DeleteUser from './components/DeleteUser'
import MapUser from './components/MapUser'
import ChartUser from './components/ChartUser'
import { useState } from 'react'
import { User } from './schema/user'
import { Search } from './schema/search'

const App = () => {
  const [users, setUsers] = useState<Array<User>>([])
  const [search, setSearch] = useState<Search>({} as Search)

  const handleSearchInput = (key: string, value: string): void => {
    setSearch({ ...search, [key]: value })
  }
  const handleSearch = (): void => {
    setUsers(
      users.filter(
        (user) =>
          user.name.includes(search.name) ||
          user.family.includes(search.family) ||
          user.nationalCode.includes(search.nationalCode)
      )
    )
  }

  const updateUser = (updatedUser: User): void => {
    setUsers(users.map((user) => (user.id == updatedUser.id ? updatedUser : user)))
  }
  const addUser = (newUser: User): void => {
    setUsers([...users, newUser])
  }
  const deleteUser = (id: number): void => {
    setUsers(users.filter((user) => user.id != id))
  }

  return (
    <>
      <div className="container flex flex-col mx-auto justify-center p-3 gap-6">
        <header className="flex flex-col gap-3">
          <Accordion className="border-1 border-black rounded-lg">
            <AccordionItem key="1" aria-label="جستجو" title="جستجو">
              <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
                <Input
                  label="نام"
                  type="text"
                  labelPlacement="inside"
                  value={search.name}
                  onValueChange={(value) => handleSearchInput('name', value)}
                />
                <Input
                  label="نام خانوادگی"
                  type="text"
                  labelPlacement="inside"
                  value={search.family}
                  onValueChange={(value) => handleSearchInput('family', value)}
                />
                <Input
                  label="کدملی"
                  type="text"
                  labelPlacement="inside"
                  value={search.nationalCode}
                  onValueChange={(value) => handleSearchInput('nationalCode', value)}
                />

                <Button color="primary" variant="solid" onPress={handleSearch}>
                  جستجو
                </Button>
              </div>
            </AccordionItem>
          </Accordion>
          <AddUser addUser={addUser} id={users.length > 0 ? users.length + 1 : 1} />
        </header>

        <main>
          <Table aria-label="جدول کاربران">
            <TableHeader>
              <TableColumn>ردیف</TableColumn>
              <TableColumn>نام</TableColumn>
              <TableColumn>نام خانوادگی</TableColumn>
              <TableColumn>کدملی</TableColumn>
              <TableColumn>عملیات</TableColumn>
            </TableHeader>
            <TableBody emptyContent={'کاربری پیدا نشد!'}>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.family}</TableCell>
                  <TableCell>{user.nationalCode}</TableCell>
                  <TableCell className="flex gap-1">
                    <ViewUser user={user} />
                    <EditUser updateUser={updateUser} user={user} />
                    <MapUser />
                    <DeleteUser deleteUser={() => deleteUser(user.id)} />
                    <ChartUser />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
      </div>
    </>
  )
}

export default App
