// src/data/staff.ts (Updated for Avatar Fetching)

import { fetchApiData } from "../utils/api";

// -------------------------------------------------------------
// TYPE DEFINITIONS
// -------------------------------------------------------------

export type RoleLevel = "Executive" | "Manager" | "Staff";

export interface StaffMember {
  callsign: string;
  name: string;
  ifc: string;
  joined: string;
  role: string;
  role_level: RoleLevel;

  // NEW: Property to hold the generated avatar URL
  avatar_url: string;
}

interface StaffApiResponseWrapper {
  status: number;
  result: Omit<StaffMember, "avatar_url">[]; // API returns members WITHOUT avatar_url
}

// -------------------------------------------------------------
// AVATAR HELPERS
// -------------------------------------------------------------

/**
 * Extracts the Discourse username from the IFC URL.
 * Example URL: "https://community.infiniteflight.com/u/bumy/summary" -> "bumy"
 */
function extractUsernameFromIfcUrl(ifcUrl: string): string | null {
  try {
    const url = new URL(ifcUrl);
    // The path should look like /u/{username}/summary or /u/{username}
    const pathParts = url.pathname.split("/").filter((p) => p.length > 0);

    // We look for the part right after '/u/'
    const uIndex = pathParts.indexOf("u");
    if (uIndex !== -1 && pathParts.length > uIndex + 1) {
      return pathParts[uIndex + 1];
    }
  } catch (e) {
    console.warn(`Could not parse IFC URL for username: ${ifcUrl}`);
  }
  return null;
}

/**
 * Constructs the default Discourse avatar URL.
 * NOTE: Discourse avatars usually follow the pattern:
 * https://community.infiniteflight.com/user_avatar/community.infiniteflight.com/{username}/{size}/1.png
 * For simplicity, we'll use a standard template or just a generic image if extraction fails.
 */
function generateAvatarUrl(username: string | null): string {
  const IFC_DOMAIN = "community.infiniteflight.com";
  const DEFAULT_AVATAR = "/default-avatar.png"; // Placeholder for a local default image

  if (!username) {
    return DEFAULT_AVATAR;
  }

  // Standard Discourse Avatar Template (using size 45 for small display)
  return `https://${IFC_DOMAIN}/user_avatar/${IFC_DOMAIN}/${username}/90/1.png`;
}

// -------------------------------------------------------------
// DEDICATED FETCH FUNCTION (Updated)
// -------------------------------------------------------------

export async function getStaffRoster(): Promise<StaffMember[]> {
  const rawData: StaffApiResponseWrapper = await fetchApiData("staff");

  if (rawData.status !== 0) {
    throw new Error(
      `Staff API reported a non-zero status (${rawData.status}).`
    );
  }

  // Map the raw results to the final StaffMember interface, adding the avatar_url
  const processedStaff: StaffMember[] = rawData.result.map((rawMember) => {
    const username = extractUsernameFromIfcUrl(rawMember.ifc);
    const avatarUrl = generateAvatarUrl(username);

    return {
      ...rawMember,
      avatar_url: avatarUrl,
    };
  });

  return processedStaff;
}
