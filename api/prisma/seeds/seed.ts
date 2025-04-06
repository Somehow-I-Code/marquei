import { prisma } from "../../src/lib/prisma";
import seedCategories from "./seed-categories";
import seedCompanies from "./seed-companies";
import seedProfiles from "./seed-profiles";
import seedResources from "./seed-resources";
import seedAppointments from "./seed-appointments";

async function main() {
    const { adminCompany, companies, allCompanies } = await seedCompanies();
    const profiles = await seedProfiles(adminCompany, companies);
    const categories = await seedCategories(allCompanies);
    const resources = await seedResources(categories);
    const appointments = await seedAppointments();

    console.log(`
        ${profiles.length} profiles created 🧑
        ${companies.length} companies created 🏢
        ${categories.length} categories created 🏷️
        ${resources.length} resources created ⭐️
        ${appointments.length} appointments created 📅
    `);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });
