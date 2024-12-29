namespace Sunergy.Business.Interface
{
    public interface IMD5Service
    {
        string GetMd5Hash(string input);
        bool VerifyMd5Hash(string input, string hash);
    }
}
