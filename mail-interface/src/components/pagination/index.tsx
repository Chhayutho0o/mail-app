"use client";
import { useCallback } from "react";
import { usePathname } from "next/navigation";
import Pagination from "./Pagination";
import { useRouter } from "@/hooks/useRouter";

type Props = {
	totalCount: number;
	perPage: number;
	searchParams: any;
	pageName?: string;
};

const CommonPagination = ({
	totalCount = 1,
	perPage = 1,
	searchParams,
	pageName = "page",
}: Props) => {
	const router = useRouter();
	const pathname = usePathname();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const onSelectPage = (page: any) => {
		router.push(pathname + "?" + createQueryString(pageName, page));
	};
	const page =
		searchParams && searchParams[pageName] ? Number(searchParams[pageName]) : 1;
	return (
		<Pagination
			currentPage={Number(page)}
			totalCount={totalCount}
			pageSize={perPage}
			onPageChange={onSelectPage}
			siblingCount={1}
		/>
	);
};

export default CommonPagination;
