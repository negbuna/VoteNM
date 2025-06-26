import { PDFDocument } from 'pdf-lib';

export interface AbsenteeFormData {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string; // always "New Mexico"
    zip: string;
    yearOfBirth: string; // YYYY
    todayDate: string; // MM/DD/YYYY
    email?: string;
    phone?: string;
    wantsPermanentAbsentee: boolean;
    signature: string;
    county: string;
    wantsAlternateAddress: boolean;
    alternateStreet?: string;
    alternateApartment?: string;
    alternateCity?: string;
    alternateState?: string;
    alternateZip?: string;
    alternateCountry?: string;
}

/**
 * Fills the official NM absentee ballot request PDF with provided data.
 * @param data AbsenteeFormData
 * @returns Promise<Blob> - filled, flattened PDF as a Blob
 */
export async function fillAbsenteeForm(data: AbsenteeFormData): Promise<Blob> {
    // Fetch the blank PDF from public folder
    const pdfUrl = '/nmabsentee.pdf';
    const pdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    console.log('PDF field names:', form.getFields().map(f => f.getName()));

    form.getTextField('FirstName').setText(data.firstName);
    form.getTextField('LastName').setText(data.lastName);

    const fullStreet = `${data.street}, ${data.city}, ${data.state} ${data.zip}`;
    form.getTextField('Street').setText(fullStreet);

    form.getTextField('YearOfBirth').setText(data.yearOfBirth);
    form.getTextField('Signature').setText(data.signature);
    form.getTextField('County').setText(data.county);

    // Optional fields
    if (data.email) form.getTextField('Email').setText(data.email);
    if (data.phone) form.getTextField('Phone').setText(data.phone);

    // Split todayDate into MM/DD/YY fields
    const [month, day, year] = data.todayDate.split('/');
    const yearSuffix = year.slice(2);
    form.getTextField('DateMonth').setText(month);
    form.getTextField('DateDay').setText(day);
    form.getTextField('DateYearSuffix').setText(yearSuffix);

    // Checkbox for permanent absentee
    if (data.wantsPermanentAbsentee) {
        form.getTextField('PermanentAbsentee').setText('X');
    }

    // Concatenate alternate address if needed
    if (data.wantsAlternateAddress) {
        const alt = [
            data.alternateStreet,
            data.alternateApartment,
            data.alternateCity,
            data.alternateState,
            data.alternateZip,
            data.alternateCountry,
        ].filter(Boolean).join(", ");
        form.getTextField("AlternateAddress").setText(alt);
    }

    // Flatten the form (make fields uneditable)
    form.flatten();

    // Return as Blob
    const filledPdfBytes = await pdfDoc.save();
    return new Blob([filledPdfBytes], { type: 'application/pdf' });
}

// Registrar email map
export const registrarEmailMap: Record<string, string> = {
    "Bernalillo": "clerk@bernco.gov",
    "Catron": "catronclerk@gm.nm.gov",
    "Chaves": "clerk@co.chaves.nm.us",
    "Cibola": "cibolaclerk@co.cibola.nm.us",
    "Colfax": "clerk@co.colfax.nm.us",
    "Curry": "clerk@currycounty.org",
    "De Baca": "debaca@bacacountyco.gov",
    "Doña Ana": "clerk@donaanacounty.org",
    "Eddy": "clerk@co.eddy.nm.us",
    "Grant": "clerk@grantcountynm.gov",
    "Guadalupe": "guadalupeclerk@guadalupecountynm.us",
    "Harding": "hardingclerk@plateautel.net",
    "Hidalgo": "clerk@hidalgocounty.org",
    "Lea": "clerk@leacounty.net",
    "Lincoln": "clerk@lincolncountynm.gov",
    "Los Alamos": "clerk@lacnm.us",
    "Luna": "clerk@lunacountynm.us",
    "McKinley": "clerk@co.mckinley.nm.us",
    "Mora": "clerk@moracountynm.gov",
    "Otero": "clerk@co.otero.nm.us",
    "Quay": "clerk@quaycounty-nm.gov",
    "Rio Arriba": "clerk@rio-arriba.org",
    "Roosevelt": "clerk@rooseveltcounty.com",
    "Sandoval": "clerk@sandovalcountynm.gov",
    "San Juan": "clerk@sjcounty.net",
    "San Miguel": "clerk@co.sanmiguel.nm.us",
    "Santa Fe": "clerk@santafecountynm.gov",
    "Sierra": "clerk@sierraco.org",
    "Socorro": "clerk@co.socorro.nm.us",
    "Taos": "clerk@taoscounty.org",
    "Torrance": "clerk@torrancecountynm.org",
    "Union": "clerk@unionnm.us",
};

export function getRegistrarEmail(county: string): string | undefined {
    return registrarEmailMap[county];
}

// 6. Simulate sending PDF to user email
export async function sendPdfToUserEmail(pdfBlob: Blob, userEmail: string, formData: AbsenteeFormData, registrarEmail: string) {
    // Simulate delay
    await new Promise((res) => setTimeout(res, 1200));
    // Simulate sending an email with a formal message
    const emailBody = `Hello ${formData.firstName} ${formData.lastName},\n\nVoteNM is currently in demo, so we are just sending your form to you. In actual deployment, we would send this form to your local county clerk: ${registrarEmail}\n\nThank you for using VoteNM!`;
    // In a real implementation, you would send the emailBody and PDF as an attachment
    console.log(`Simulated email to ${userEmail}:\n${emailBody}`);
    return { success: true, message: `Simulated sending PDF to ${userEmail}` };
}
