import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Role = "user" | "doctor" | "pharmacy";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [open, setOpen] = useState(true); // dialog opens automatically
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedRole) return;

    if (selectedRole === "user") navigate("/user/register");
    if (selectedRole === "doctor") navigate("/doctor/register");
    if (selectedRole === "pharmacy") navigate("/pharmacy/register");

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Your Role</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-4">
          <Button
            variant={selectedRole === "user" ? "default" : "outline"}
            onClick={() => setSelectedRole("user")}
          >
            Patient / User
          </Button>
          <Button
            variant={selectedRole === "doctor" ? "default" : "outline"}
            onClick={() => setSelectedRole("doctor")}
          >
            Doctor
          </Button>
          <Button
            variant={selectedRole === "pharmacy" ? "default" : "outline"}
            onClick={() => setSelectedRole("pharmacy")}
          >
            Pharmacy
          </Button>
        </div>

        <DialogFooter>
          <Button onClick={handleContinue} disabled={!selectedRole}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
