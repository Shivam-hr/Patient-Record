import { offset } from "./dates";

// This shape mirrors what the Supabase "patients" table will look like:
// id, name, phone, visit_date, next_visit_date, status
export const seedPatients = [
  { id: 1, name: "Shivam Sharma", phone: "98765 43210", visitDate: offset(0), nextVisitDate: offset(3), status: "visited" },
  { id: 2, name: "Rohit Verma", phone: "87654 32109", visitDate: offset(0), nextVisitDate: offset(5), status: "visited" },
  { id: 3, name: "Anjali Gupta", phone: "76543 21098", visitDate: offset(0), nextVisitDate: offset(7), status: "visited" },
  { id: 4, name: "Neha Singh", phone: "65432 10987", visitDate: offset(-1), nextVisitDate: offset(10), status: "visited" },
  { id: 5, name: "Amit Kumar", phone: "91234 56789", visitDate: offset(-5), nextVisitDate: offset(0), status: "pending_due" },
  { id: 6, name: "Priya Patel", phone: "99887 66554", visitDate: offset(-10), nextVisitDate: offset(0), status: "pending_due" },
  { id: 7, name: "Suresh Yadav", phone: "88776 55433", visitDate: offset(-14), nextVisitDate: offset(0), status: "pending_due" },
  { id: 8, name: "Karan Mehta", phone: "77665 44322", visitDate: offset(-6), nextVisitDate: offset(0), status: "pending_due" },
  { id: 9, name: "Meena Joshi", phone: "66554 33211", visitDate: offset(-8), nextVisitDate: offset(0), status: "pending_due" },
];
