import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useDashboardParams = (defaultLimit = 10) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || defaultLimit;
  const table = searchParams.get("table") || "";

  useEffect(() => {
    if (!searchParams.has("page") || !searchParams.has("limit")) {
      setSearchParams(
        (prev) => {
          const updated = new URLSearchParams(prev);
          if (!updated.has("page")) {
            updated.set("page", "1");
          }
          if (!updated.has("limit")) {
            updated.set("limit", defaultLimit.toString());
          }
          return updated;
        },
        { replace: true }, // 'replace' prevents clumping up browser history
      );
    }
  }, []);

  const updateParams = (newParams) => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          updated.delete(key);
        } else {
          updated.set(key, value.toString());
        }
      });

      return updated;
    });
  };

  return { page, limit, table, updateParams, searchParams };
};
