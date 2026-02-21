import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

export const FormAddUser = ({ props }) => {
  const {
    onAddUser,
    formData,
    handleChange,
    handleGenderChange,
    handleRoleChange,
    isLoading,
  } = props;

  return (
    <form
      className="flex flex-col gap-2 text-start text-main-theme"
      onSubmit={onAddUser}
    >
      <div className="flex flex-col gap-1">
        <label className="" htmlFor="full_name">
          Full Name
        </label>
        <Input
          id="full_name"
          name="full_name"
          placeholder="Jane Doe"
          value={formData.full_name}
          onChange={handleChange}
          className="rounded-sm text-sm"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          name="email"
          placeholder="email@site.co"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="rounded-sm text-sm"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          name="password"
          placeholder="*******"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="rounded-sm text-sm"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="" htmlFor="gender">
          Gender
        </label>
        <Select onValueChange={handleGenderChange} name="gender" id="gender">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="" htmlFor="phone">
          Phone
        </label>
        <Input
          id="phone"
          name="phone"
          placeholder="0812"
          type="number"
          value={formData.phone}
          onChange={handleChange}
          className="rounded-sm text-sm"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="" htmlFor="city_address">
          City Address
        </label>
        <Input
          id="city_address"
          name="city_address"
          placeholder="West Jakarta"
          value={formData.city_address}
          onChange={handleChange}
          className="rounded-sm text-sm"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="" htmlFor="role">
          Role
        </label>
        <Select onValueChange={handleRoleChange} name="role" id="role">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button
        className="w-full md:w-25 mt-3 ml-auto bg-main-theme text-white cursor-pointer hover:text-main-theme transition"
        variant="outline"
      >
        {isLoading ? <Spinner /> : ""} Save
      </Button>
    </form>
  );
};
