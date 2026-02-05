import { renderHook } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { usePagination, DOTS } from "./usePagination";

describe("usePagination", () => {
  test("returns simple range when total pages less than siblings + 5", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 50,
        pageSize: 10,
        siblingCount: 1,
        currentPage: 1,
      }),
    );
    expect(result.current).toEqual([1, 2, 3, 4, 5]);
  });

  test("shows dots on right side when on first page", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 100,
        pageSize: 10,
        siblingCount: 1,
        currentPage: 1,
      }),
    );
    expect(result.current).toContain(DOTS);
    expect(result.current[result.current.length - 1]).toBe(10);
    expect(result.current[0]).toBe(1);
  });

  test("shows dots on left side when on last page", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 100,
        pageSize: 10,
        siblingCount: 1,
        currentPage: 10,
      }),
    );
    expect(result.current).toContain(DOTS);
    expect(result.current[0]).toBe(1);
    expect(result.current[result.current.length - 1]).toBe(10);
  });

  test("shows dots on both sides when on middle page", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 100,
        pageSize: 10,
        siblingCount: 1,
        currentPage: 5,
      }),
    );
    const dotsCount = result.current.filter((item) => item === DOTS).length;
    expect(dotsCount).toBe(2);
    expect(result.current[0]).toBe(1);
    expect(result.current[result.current.length - 1]).toBe(10);
  });

  test("handles single page", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 5,
        pageSize: 10,
        siblingCount: 1,
        currentPage: 1,
      }),
    );
    expect(result.current).toEqual([1]);
  });

  test("respects siblingCount of 2", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 100,
        pageSize: 10,
        siblingCount: 2,
        currentPage: 5,
      }),
    );
    // With siblingCount=2, should show [1, DOTS, 3, 4, 5, 6, 7, DOTS, 10]
    expect(result.current).toContain(3);
    expect(result.current).toContain(4);
    expect(result.current).toContain(5);
    expect(result.current).toContain(6);
    expect(result.current).toContain(7);
  });

  test("updates when currentPage changes", () => {
    const { result, rerender } = renderHook(
      ({ currentPage }) =>
        usePagination({
          totalCount: 100,
          pageSize: 10,
          siblingCount: 1,
          currentPage,
        }),
      { initialProps: { currentPage: 1 } },
    );

    expect(result.current[0]).toBe(1);

    rerender({ currentPage: 10 });
    expect(result.current[result.current.length - 1]).toBe(10);
  });

  test("handles different page sizes", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 100,
        pageSize: 20,
        siblingCount: 1,
        currentPage: 1,
      }),
    );
    // With pageSize=20, totalPages=5
    expect(result.current).toEqual([1, 2, 3, 4, 5]);
  });

  test("calculates correct total page count", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 95,
        pageSize: 10,
        siblingCount: 1,
        currentPage: 1,
      }),
    );
    // 95 items / 10 per page = 10 pages (ceiling)
    const lastPage = result.current[result.current.length - 1];
    expect(lastPage).toBe(10);
  });

  test("handles currentPage near the end", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 100,
        pageSize: 10,
        siblingCount: 1,
        currentPage: 9,
      }),
    );
    // Should show right side without dots
    expect(result.current[0]).toBe(1);
    expect(result.current).toContain(DOTS);
    expect(result.current).toContain(8);
    expect(result.current).toContain(9);
    expect(result.current).toContain(10);
  });

  test("handles currentPage near the start", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalCount: 100,
        pageSize: 10,
        siblingCount: 1,
        currentPage: 2,
      }),
    );
    // Should show left side without dots
    expect(result.current).toContain(1);
    expect(result.current).toContain(2);
    expect(result.current).toContain(3);
    expect(result.current).toContain(DOTS);
    expect(result.current[result.current.length - 1]).toBe(10);
  });
});
