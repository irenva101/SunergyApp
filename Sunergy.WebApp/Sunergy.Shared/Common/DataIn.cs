namespace Sunergy.Shared.Common
{
    public class DataIn<T>
    {
        public int PageSize { get; set; }

        public int CurrentPage { get; set; }

        public T Data { get; set; }
    }
}
